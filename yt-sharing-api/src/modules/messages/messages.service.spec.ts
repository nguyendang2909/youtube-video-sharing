import { describe } from 'node:test';

import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { ChatsGateway } from '../chats/chats.gateway';
import { MessageEntity } from './message-entity.service';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageEntity: MessageEntity;
  let chatsGateway: ChatsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: MessageEntity, useValue: createMock() },
        { provide: ChatsGateway, useValue: createMock() },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageEntity = module.get<MessageEntity>(MessageEntity);
    chatsGateway = module.get<ChatsGateway>(ChatsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getYtVideoIdFromUrl', () => {
    it('Should return youtube video id', () => {
      const result = service.getYtVideoIdFromUrl(
        'https://www.youtube.com/watch?v=yoYv_ezmvqI&ab_channel=Ho%C3%A0ngD%C5%A9ng',
      );

      expect(result).toEqual('yoYv_ezmvqI');
    });

    it('Should not return youtube video id', () => {
      const result = service.getYtVideoIdFromUrl('bcxasdads');

      expect(result).toEqual('');
    });
  });
});
