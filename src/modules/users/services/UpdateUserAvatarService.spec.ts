import 'reflect-metadata';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update the user avatar', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    const updateAvatarResult = await updateUserAvatar.execute({
      user_id: user.id,
      tmpFileName: '/somePath/avatar.jpg',
    });

    expect(updateAvatarResult).toEqual(`${user.id}.jpg`);
  });

  it('Should delete old avatar before add new', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create(new FakeUser());

    await updateUserAvatar.execute({
      user_id: user.id,
      tmpFileName: '/somePath/avatar.jpg',
    });

    const updateAvatarResult = await updateUserAvatar.execute({
      user_id: user.id,
      tmpFileName: '/somePath/newAvatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith({
      file: `${user.id}.jpg`,
      type: 'avatar',
    });
    expect(updateAvatarResult).toEqual(`${user.id}.jpg`);
  });

  it('Should not allow to update avatar for invalid users', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'Non Existent User',
        tmpFileName: '/somePath/avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
