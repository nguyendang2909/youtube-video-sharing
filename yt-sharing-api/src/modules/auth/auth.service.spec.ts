import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import _ from 'lodash';

import { EncryptionsUtil } from '../encryptions/encryptions.util';
import { User } from '../users/entities/user.entity';
import { UserEntity } from '../users/users-entity.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let encryptionsUtil: EncryptionsUtil;
  let userEntity: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: EncryptionsUtil,
          useValue: createMock(),
        },
        {
          provide: UserEntity,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    encryptionsUtil = module.get<EncryptionsUtil>(EncryptionsUtil);
    userEntity = module.get<UserEntity>(UserEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#signIn', () => {
    it('Should sign in fail when input wrong password', async () => {
      const payload = {
        email: 'quynh@gmail.com',
        password: '12345678',
      };
      const mockUser = createMock<User>({ id: 'userid123', password: '12345' });

      jest.spyOn(userEntity, 'findOne').mockResolvedValue(mockUser);
      jest
        .spyOn(encryptionsUtil, 'isMatchWithHashedKey')
        .mockReturnValue(false);

      const result = service.signIn(payload);

      await expect(result).rejects.toThrow('Password is not correct!');
      expect(userEntity.findOne).toHaveBeenCalledTimes(1);
      expect(userEntity.findOne).toHaveBeenCalledWith({
        where: {
          email: payload.email,
        },
      });
      expect(encryptionsUtil.isMatchWithHashedKey).toHaveBeenCalledTimes(1);
      expect(encryptionsUtil.isMatchWithHashedKey).toHaveBeenCalledWith(
        payload.password,
        mockUser.password,
      );
    });

    it('Should sign in fail when input wrong password', async () => {
      const payload = {
        email: 'quynh@gmail.com',
        password: '12345678',
      };

      const mockUser = createMock<User>({ id: 'userid123', password: '12345' });

      jest.spyOn(userEntity, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(encryptionsUtil, 'isMatchWithHashedKey').mockReturnValue(true);
      jest.spyOn(encryptionsUtil, 'signJwt').mockReturnValue('token-1234');

      const result = service.signIn(payload);

      await expect(result).resolves.toEqual({
        accessToken: 'token-1234',
        profile: _.omit(mockUser, ['password']),
      });
      expect(userEntity.findOne).toHaveBeenCalledTimes(1);
      expect(userEntity.findOne).toHaveBeenCalledWith({
        where: {
          email: payload.email,
        },
      });
      expect(encryptionsUtil.isMatchWithHashedKey).toHaveBeenCalledTimes(1);
      expect(encryptionsUtil.isMatchWithHashedKey).toHaveBeenCalledWith(
        payload.password,
        mockUser.password,
      );
      expect(encryptionsUtil.signJwt).toHaveBeenCalledTimes(1);
      expect(encryptionsUtil.signJwt).toHaveBeenCalledWith({
        id: mockUser.id,
        sub: mockUser.id,
      });
    });

    it('Should sign in fail when input wrong password', async () => {
      const payload = {
        email: 'quynh@gmail.com',
        password: '12345678',
      };

      const mockUser = createMock<User>({ id: 'userid123', password: '12345' });

      jest.spyOn(userEntity, 'findOne').mockResolvedValue(null);
      jest.spyOn(encryptionsUtil, 'isMatchWithHashedKey').mockReturnValue(true);
      jest.spyOn(encryptionsUtil, 'signJwt').mockReturnValue('token-1234');
      jest.spyOn(encryptionsUtil, 'hash').mockReturnValue('hasedPasswod1234');
      jest.spyOn(userEntity, 'save').mockResolvedValue(mockUser);

      const result = service.signIn(payload);

      await expect(result).resolves.toEqual({
        accessToken: 'token-1234',
        profile: _.omit(mockUser, ['password']),
      });
      expect(userEntity.findOne).toHaveBeenCalledTimes(1);
      expect(userEntity.findOne).toHaveBeenCalledWith({
        where: {
          email: payload.email,
        },
      });
      expect(encryptionsUtil.hash).toHaveBeenCalledTimes(1);
      expect(encryptionsUtil.hash).toHaveBeenCalledWith(payload.password);
      expect(encryptionsUtil.signJwt).toHaveBeenCalledTimes(1);
      expect(userEntity.save).toHaveBeenCalledWith({
        email: payload.email,
        password: 'hasedPasswod1234',
      });
      expect(encryptionsUtil.signJwt).toHaveBeenCalledTimes(1);
      expect(encryptionsUtil.signJwt).toHaveBeenCalledWith({
        id: mockUser.id,
        sub: mockUser.id,
      });
    });
  });
});
