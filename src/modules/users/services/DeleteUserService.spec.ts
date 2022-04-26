import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
import { IUser } from '../models/IUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import { DeleteUserService } from './DeleteUserService';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteUserService: DeleteUserService;

let updateUserAvatar: UpdateUserAvatarService;

describe('DeleteUser', () => {
  const newUserData = new FakeUser();

  let user: IUser;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeStorageProvider = new FakeStorageProvider();

    deleteUserService = new DeleteUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    user = await fakeUsersRepository.create(newUserData);
  });

  it('should be able to delete a user', async () => {
    const deletedUser = await deleteUserService.execute({
      userId: user.id,
      authUserId: user.id,
    });

    const totalUsers = await fakeUsersRepository.getTotal();

    expect(totalUsers).toBe(0);
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

  it('Should delete avatar file when removing an user', async () => {
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await updateUserAvatar.execute({
      user_id: user.id,
      tmpFileName: '/some_path/avatar.jpg',
    });

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    await deleteUserService.execute({
      userId: user.id,
      authUserId: user.id,
    });

    expect(deleteFile).toBeCalledWith({
      file: '/some_path/avatar.jpg',
      type: 'avatar',
    });
  });
});
