import { IUser } from "../../models/user";

export interface IDeleteUserRepository {
  delete(id: string): Promise<IUser>;
}
