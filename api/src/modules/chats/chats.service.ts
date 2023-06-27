import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { EncryptionsUtil } from '../encryptions/encryptions.util';
import { UserEntity } from '../users/users-entity.service';

@Injectable()
export class ChatsService {
  constructor(
    private readonly encryptionsUtil: EncryptionsUtil,
    private readonly userEntity: UserEntity,
  ) {}

  private readonly logger = new Logger(ChatsService.name);

  public async handleConnection(socket: Socket) {
    try {
      const { authorization } = socket.handshake.headers;
      const token = authorization?.split(' ')[1];
      if (token) {
        const decodedToken = this.encryptionsUtil.verifyJwt(token);
        const user = await this.userEntity.findOne({
          where: {
            id: decodedToken.id,
          },
        });
        if (user) {
          socket.handshake.user = user;
          socket.join(user.id);
          this.logger.log(`Socket connected: ${socket.id}`);
          return;
        }
      }

      throw new Error('Invalid credentials!');
    } catch (err) {
      socket.disconnect();
    }
  }
}
