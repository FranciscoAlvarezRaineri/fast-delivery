import { IPackageRef } from '../../package/interface/package.interface';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: UserStatus;
  rating: number;
  packages: IPackageRef[];
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface IUserRef {
  _id: string;
  fullName: string;
}

export interface IClientRef {
  _id: string;
  fullName: string;
  adress: string;
}
