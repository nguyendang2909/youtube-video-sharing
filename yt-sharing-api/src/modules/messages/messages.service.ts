import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

import { User } from '../users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './message-entity.service';
import { YtVideoInfo } from './messages.type';

@Injectable()
export class MessagesService {
  constructor(private readonly messageEntity: MessageEntity) {}

  private readonly YT_API_KEY = process.env.YOUTUBE_API_KEY;

  public async create(payload: CreateMessageDto, userId: string) {
    const { url } = payload;
    const videoId = this.getYtVideoIdFromUrl(url);
    if (!videoId) {
      throw new BadRequestException('Check your link!');
    }
    const { data } = await axios
      .get<YtVideoInfo>(
        `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet,statistics&id=${videoId}&key=${this.YT_API_KEY}`,
      )
      .catch(() => {
        throw new BadRequestException('Check your link or your connection!');
      });
    const videoInfo = data?.items[0];

    return await this.messageEntity.save({
      url: payload.url,
      user: new User({ id: userId }),
      createdBy: userId,
      videoId: videoId,
      title: videoInfo.snippet.title,
      viewCount: +(videoInfo.statistics?.viewCount || 0),
      likeCount: +(videoInfo.statistics?.likeCount || 0),
      favoriteCount: +(videoInfo.statistics?.favoriteCount || 0),
      commentCount: +(videoInfo.statistics?.commentCount || 0),
      description: videoInfo.snippet.description,
    });
  }

  public async findAll() {
    return await this.messageEntity.find({
      relations: ['user'],
      order: {
        createdAt: -1,
      },
      select: {
        id: true,
        user: { id: true, email: true },
        url: true,
        videoId: true,
        title: true,
        viewCount: true,
        likeCount: true,
        favoriteCount: true,
        commentCount: true,
        description: true,
        createdAt: true,
      },
    });
  }

  public getYtVideoIdFromUrl(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : '';
  }
}
