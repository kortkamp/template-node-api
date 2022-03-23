import { CreateRoleService } from '@modules/roles/services/CreateRoleService';
import { ListRolesService } from '@modules/roles/services/ListRolesService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRolesService = container.resolve(ListRolesService);

    const roles = await listRolesService.execute();

    return response.json(instanceToInstance(roles));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute(request.body);

    return response.status(201).json(instanceToInstance(role));
  }
}

export { RolesController };
