import { IRole } from '@modules/roles/models/IRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RolePermission } from './RolePermission';

@Entity('roles')
class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => RolePermission, rolePermission => rolePermission.role)
  @JoinColumn({ name: 'id' })
  permissions: RolePermission[];

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

export { Role };
