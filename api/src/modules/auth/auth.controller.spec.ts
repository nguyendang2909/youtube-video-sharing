import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInData } from './auth.type';

describe('SignInController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#signIn', () => {
    it('Should sign in successfully', async () => {
      const payload = {
        email: 'quynh@gmail.com',
        password: '12345678',
      };
      const mockSignInData = createMock<SignInData>({
        accessToken: 'abcxyz',
        profile: {
          id: 'userid-1234',
        },
      });

      jest.spyOn(service, 'signIn').mockResolvedValue(mockSignInData);

      const result = controller.signIn(payload);

      await expect(result).resolves.toEqual({
        type: 'signIn',
        data: mockSignInData,
      });
      expect(service.signIn).toHaveBeenCalledWith(payload);
    });
  });
});
