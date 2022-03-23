import { CreateRolePermissionService } from '@modules/roles/services/CreateRolePermissionService';
import { ListRolePermissionsService } from '@modules/roles/services/ListRolePermissionsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RolePermissionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRolePermissionsService = container.resolve(
      ListRolePermissionsService,
    );

    const rolePermissions = await listRolePermissionsService.execute();

    return response.json(instanceToInstance(rolePermissions));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRolePermissionService = container.resolve(
      CreateRolePermissionService,
    );

    const rolePermission = await createRolePermissionService.execute(
      request.body,
    );

    return response.status(201).json(instanceToInstance(rolePermission));
  }
}

export { RolePermissionsController };
