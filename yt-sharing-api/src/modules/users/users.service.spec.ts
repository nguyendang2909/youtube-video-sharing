import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import _ from 'lodash';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserEntity } from './users-entity.service';

describe('UsersService', () => {
  let service: UsersService;
  let userEntity: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserEntity,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userEntity = module.get<UserEntity>(UserEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getProfile', () => {
    it('Should get profile successfully', async () => {
      const mockUserId = '1234565';
      const mockProfile = createMock<User>({
        id: mockUserId,
        password: 'abc-123',
      });

      jest.spyOn(userEntity, 'findOne').mockResolvedValue(mockProfile);

      const result = service.getProfile(mockUserId);

      await expect(result).resolves.toEqual(_.omit(mockProfile, ['password']));
      expect(userEntity.findOne).toHaveBeenCalledTimes(1);
      expect(userEntity.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUserId,
        },
      });
    });
  });
});
