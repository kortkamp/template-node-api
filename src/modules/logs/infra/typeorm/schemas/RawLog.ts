import { IRawLog } from '@modules/logs/models/IRawLog';
import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('raw_logs')
class RawLog implements IRawLog {
  @ObjectIdColumn()
  id: string;

  @Column()
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default RawLog;
