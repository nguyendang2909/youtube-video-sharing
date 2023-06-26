import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getProfile', () => {
    it('Should get profile successfully', async () => {
      const userId = 'c3231a54-b18a-42ce-9606-3a624b32e9a8';
      const mockReturnGetProfile = createMock<User>({
        id: userId,
        email: 'quynh@gmail.com',
      });

      jest.spyOn(service, 'getProfile').mockResolvedValue(mockReturnGetProfile);

      const result = controller.getProfile(userId);

      await expect(result).resolves.toEqual({
        type: 'profile',
        data: mockReturnGetProfile,
      });
      expect(service.getProfile).toHaveBeenCalledWith(userId);
    });
  });
});
