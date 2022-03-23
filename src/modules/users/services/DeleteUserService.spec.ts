import 'reflect-metadata';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import { DeleteUserService } from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  const newUserData = {
    email: 'johndoe@example.com',
    name: 'John Doe',
    password: '123456',
  };

  let user: IUser;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUserService = new DeleteUserService(fakeUsersRepository);

    user = await fakeUsersRepository.create(newUserData);
  });

  it('should be able to delete a user', async () => {
    const deletedUser = await deleteUserService.execute({
      userId: user.id,
      authUserId: user.id,
    });

    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete a nonexistent user', async () => {
    await expect(
      deleteUserService.execute({
        authUserId: user.id,
        userId: 'user non-existing',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  // it('should not be able to delete a user without being admin', async () => {
  //   await expect(
  //     deleteUser.execute({
  //       loggedUserId: user.id,
  //       userId: admin.id,
  //     }),
  //   ).rejects.toBeInstanceOf(ErrorsApp);
  // });
});
