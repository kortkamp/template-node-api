import { IRolePermission } from '@modules/roles/models/IRolePermission';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Role } from './Role';

@Entity('role_permissions')
class RolePermission implements IRolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resource: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role, role => role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @Column()
  list: boolean;

  @Column()
  create: boolean;

  @Column()
  read: boolean;

  @Column()
  update: boolean;

  @Column()
  delete: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RolePermission };
