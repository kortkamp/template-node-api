import { ConfirmUserService } from '@modules/users/services/ConfirmUserService';
import { ForgotPasswordService } from '@modules/users/services/ForgotPasswordService';
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserTokensController {
  public async confirm(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const confirmUser = container.resolve(ConfirmUserService);

    const { token } = request.query;

    await confirmUser.execute(token as string);

    return response
      .status(200)
      .json({ success: true, message: 'User confirmed' });
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

export { UserTokensController };
