import { IMailErrorLog } from '@modules/logs/models/IMailErrorLog';
import { ObjectIdColumn, Entity, Column, CreateDateColumn } from 'typeorm';

import { ISendMailDTO } from '@shared/container/providers/MailProvider/dto/ISendMailDTO';

@Entity('mail_error_logs')
class MailErrorLog implements IMailErrorLog {
  @ObjectIdColumn()
  id: string;

  @Column()
  message: ISendMailDTO;

  @Column()
  error: Error;

  @CreateDateColumn()
  createdAt: Date;
}

export default MailErrorLog;
