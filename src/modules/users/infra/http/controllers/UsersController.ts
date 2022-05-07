import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute(parseQueryFilters(request.query));

    return response.json({ success: true, ...instanceToInstance(users) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);

    const userId = request.params.id;
    const authUser = request.user;

    const user = await showUserService.execute({ authUser, userId });

    return response.json({ success: true, user: instanceToInstance(user) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, user: instanceToInstance(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService);

    const data = request.body;
    const userId = request.params.id;
    const authUserId = request.user.id;

    const user = await updateUserService.execute({ authUserId, data, userId });

    return response.json({ success: true, user: instanceToInstance(user) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);

    const userId = request.params.id;
    const authUserId = request.user.id;

    await deleteUserService.execute({ userId, authUserId });

    return response.status(204).send();
  }
}

export { UsersController };
