import { CreateRoleService } from '@modules/roles/services/CreateRoleService';
import { DeleteRoleService } from '@modules/roles/services/DeleteRoleService';
import { ListRolesService } from '@modules/roles/services/ListRolesService';
import { ShowRoleService } from '@modules/roles/services/ShowRoleService';
import { UpdateRoleService } from '@modules/roles/services/UpdateRoleService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRolesService = container.resolve(ListRolesService);

    const roles = await listRolesService.execute();

    return response.json({ success: true, roles: instanceToInstance(roles) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, role: instanceToInstance(role) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteRoleService = container.resolve(DeleteRoleService);

    const roleId = request.params.id;

    await deleteRoleService.execute(roleId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateRoleService = container.resolve(UpdateRoleService);

    const roleId = request.params.id;

    const data = request.body;

    const role = await updateRoleService.execute({ roleId, data });

    return response.status(200).json({ success: true, role });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showRoleService = container.resolve(ShowRoleService);

    const roleId = request.params.id;

    const role = await showRoleService.execute(roleId);

    return response.status(200).json({ success: true, role });
  }
}

export { RolesController };
