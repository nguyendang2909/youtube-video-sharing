import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from '../../../commons/entities/common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Message extends CommonEntity {
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'varchar', nullable: false })
  url!: string;

  @Column({ name: 'video_id', type: 'varchar', nullable: false })
  videoId!: string;

  @Column({ name: 'title', type: 'varchar', nullable: true })
  title?: string;

  @Column({ name: 'view_count', type: 'integer', nullable: true })
  viewCount?: number;

  @Column({ name: 'like_count', type: 'integer', nullable: true })
  likeCount?: number;

  @Column({ name: 'favorite_count', type: 'integer', nullable: true })
  favoriteCount?: number;

  @Column({ name: 'comment_count', type: 'integer', nullable: true })
  commentCount?: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;
}
