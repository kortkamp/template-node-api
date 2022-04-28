import {
  loginPath,
  userPath,
  userResultPath,
  rolePath,
  roleResultPath,
} from './paths/';

export default {
  '/sessions': loginPath,
  '/users': userPath,
  '/users/{id}': userResultPath,
  '/roles': rolePath,
  '/roles/{id}': roleResultPath,
};
