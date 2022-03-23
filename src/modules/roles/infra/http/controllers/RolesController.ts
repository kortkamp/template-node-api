import { CreateRoleService } from '@modules/roles/services/CreateRoleService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RolesController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const listRoles = container.resolve();

  //   const roles = await listRoles.execute();

  //   return response.json(instanceToInstance(roles));
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute(request.body);

    return response.status(201).json(instanceToInstance(role));
  }
}

export { RolesController };
