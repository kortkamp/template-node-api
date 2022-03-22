import { User } from '@modules/users/infra/typeorm/models/User';
import { IUserToken } from '@modules/users/models/IUserToken';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('user_tokens')
class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.token) {
      this.token = uuid();
    }
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UserToken };
