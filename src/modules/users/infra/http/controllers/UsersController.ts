import { ConfirmUserService } from '@modules/users/services/ConfirmUserService';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { ForgotPasswordService } from '@modules/users/services/ForgotPasswordService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
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

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService);

    const data = request.body;
    const userId = request.params.id;
    const authUserId = request.user.id;

    const user = await updateUserService.execute({ authUserId, data, userId });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);

    const userId = request.params.id;
    const authUserId = request.user.id;

    await deleteUserService.execute({ userId, authUserId });

    return response.status(204).send();
  }

  public async confirm(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const confirmUser = container.resolve(ConfirmUserService);

    const { token } = request.query;

    await confirmUser.execute(token as string);

    return response
      .status(200)
      .json({ success: true, message: 'user confirmed' });
  }
  public async forgotPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const forgotPassword = container.resolve(ForgotPasswordService);

    const { email } = request.body;

    await forgotPassword.execute(email);

    return response.status(200).json({ success: true, message: 'Email sent' });
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute(request.body);

    return response
      .status(200)
      .json({ success: true, message: 'Password successfully updated' });
  }
}

export { UsersController };
