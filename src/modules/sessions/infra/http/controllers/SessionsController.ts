import { CreateSessionService } from '@modules/sessions/services/CreateSessionService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute(request.body);

    return response.status(200).json(instanceToInstance(session));
  }
}

export { SessionsController };
