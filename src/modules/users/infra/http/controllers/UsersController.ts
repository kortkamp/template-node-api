import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(request.body);

    return response.status(201).json(instanceToInstance(user));
  }
}

export { UsersController };
