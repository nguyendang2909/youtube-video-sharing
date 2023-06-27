import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsModule } from '../chats/chats.module';
import { Message } from './entities/message.entity';
import { MessageEntity } from './message-entity.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChatsModule],
  exports: [MessageEntity],
  controllers: [MessagesController],
  providers: [MessagesService, MessageEntity],
})
export class MessagesModule {}
