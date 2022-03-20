import {
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('error_logs')
class ErrorLog {
  @ObjectIdColumn()
  id: string;

  @Column()
  route: string;

  @Column('uuid')
  userId: string;

  @Column()
  requestMethod: string;

  @Column()
  requestQuery: Record<string, unknown>;

  @Column()
  requestBody: Record<string, unknown>;

  @Column()
  responseCode: number;

  @Column()
  responseMessage: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default ErrorLog;
