import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../users/entities/user.entity';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('Should create yt shared video successfully', async () => {
      const payload = {
        url: 'https://youtube.com/asdasda',
      };
      const mockUser = createMock<User>({ id: 'userid' });
      const mockMessage = createMock<Message>({ id: 'id1234' });

      jest.spyOn(service, 'create').mockResolvedValue(mockMessage);

      const result = controller.create(payload, mockUser);

      await expect(result).resolves.toEqual({
        type: 'createYtSharedVideo',
        data: mockMessage,
      });
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(payload, mockUser);
    });
  });

  describe('#findAll', () => {
    it('Should find all yt shared video successfully', async () => {
      const mockUser = createMock<User>({ id: 'userid' });
      const mockMessage = createMock<Message[]>([{ id: 'id1234' }]);

      jest.spyOn(service, 'findAll').mockResolvedValue(mockMessage);

      const result = controller.findAll();

      await expect(result).resolves.toEqual({
        type: 'ytSharedVideos',
        data: mockMessage,
      });
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });
});
