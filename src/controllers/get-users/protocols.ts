import { IUser } from "../../models/user";
import { IHttpResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<IHttpResponse<IUser[]>>;
}

export interface IGetUserRepository {
  getUsers(): Promise<IUser[]>;
}
