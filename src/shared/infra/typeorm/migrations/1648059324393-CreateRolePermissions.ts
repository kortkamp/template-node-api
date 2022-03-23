import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolePermissions1648059324393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'resource',
            type: 'varchar(255)',
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
          {
            name: 'list',
            type: 'boolean',
          },
          {
            name: 'create',
            type: 'boolean',
          },
          {
            name: 'read',
            type: 'boolean',
          },
          {
            name: 'update',
            type: 'boolean',
          },
          {
            name: 'delete',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'RolePermissionRole',
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_permissions');
  }
}
