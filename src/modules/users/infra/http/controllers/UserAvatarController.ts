import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const tmpFileName = request.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({ user_id, tmpFileName });
    return response.json({ success: true, user });
  }
}
export { UserAvatarController };
