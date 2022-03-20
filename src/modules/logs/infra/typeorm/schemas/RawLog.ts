import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('raw_logs')
class RawLog {
  @ObjectIdColumn()
  id: string;

  @Column()
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default RawLog;
