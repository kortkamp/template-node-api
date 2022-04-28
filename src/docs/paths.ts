import { loginPath, userPath, userResultPath } from './paths/';

export default {
  '/sessions': loginPath,
  '/users': userPath,
  '/users/{id}': userResultPath,
};
