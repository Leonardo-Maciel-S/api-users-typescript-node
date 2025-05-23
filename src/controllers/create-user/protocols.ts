import { IUser } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<IUser>>;
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<IUser>;
}
