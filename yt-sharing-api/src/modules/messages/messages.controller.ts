import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../commons/decorators/current-user-id.decorator';
import { IsPublicEndpoint } from '../../commons/decorators/is-public.endpoint';
import { User } from '../users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('messages')
@ApiBearerAuth('JWT')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  public async create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() currentUser: User,
  ) {
    return {
      type: 'sendMessage',
      data: await this.messagesService.create(createMessageDto, currentUser),
    };
  }

  @Get()
  @IsPublicEndpoint()
  public async findAll() {
    return {
      type: 'ytSharedVideos',
      data: await this.messagesService.findAll(),
    };
  }
}
