import { IUser } from "../../models/user";

export interface IGetUserRepository {
  getUsers(): Promise<IUser[]>;
}
