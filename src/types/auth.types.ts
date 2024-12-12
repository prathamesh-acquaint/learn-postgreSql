import { Role } from '../constant/index.constant';

export interface RoleI {
  role: Role.ADMIN | Role.COMPANY | Role.INSTRUCTOR | Role.INSTRUCTOR;
}

export interface RoleUserI {
  role: Role.COMPANY | Role.INSTRUCTOR | Role.INSTRUCTOR;
}
