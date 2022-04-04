import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import { DeleteUserService } from './DeleteUserService';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteUserService: DeleteUserService;

let updateUserAvatar: UpdateUserAvatarService;

describe('DeleteUser', () => {
  const newUserData = {
    email: 'johndoe@example.com',
    role_id: '111',
    name: 'John Doe',
    password: '123456',
  };

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

    const listLength = await fakeUsersRepository.getAll();

    expect(listLength).toHaveLength(0);
    expect(deleteFile).toBeCalledWith({
      file: `${user.id}.jpg`,
      type: 'avatar',
    });
  });
});
