import { CreateRolePermissionService } from '@modules/roles/services/CreateRolePermissionService';
import { DeleteRolePermissionService } from '@modules/roles/services/DeleteRolePermissionService';
import { ListRolePermissionsService } from '@modules/roles/services/ListRolePermissionsService';
import { ShowRolePermissionService } from '@modules/roles/services/ShowRolePermissionService';
import { UpdateRolePermissionService } from '@modules/roles/services/UpdateRolePermissionService';
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteRolePermissionService = container.resolve(
      DeleteRolePermissionService,
    );

    const roleId = request.params.id;

    await deleteRolePermissionService.execute(roleId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateRolePermissionService = container.resolve(
      UpdateRolePermissionService,
    );

    const rolePermissionId = request.params.id;

    const data = request.body;

    const rolePermission = await updateRolePermissionService.execute({
      rolePermissionId,
      data,
    });

    return response.status(200).json({ success: true, rolePermission });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showRolePermissionService = container.resolve(
      ShowRolePermissionService,
    );

    const rolePermissionId = request.params.id;

    const rolePermission = await showRolePermissionService.execute(
      rolePermissionId,
    );

    return response.status(200).json({ success: true, rolePermission });
  }
}

export { RolePermissionsController };
