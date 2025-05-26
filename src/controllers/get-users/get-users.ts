import { IUser } from "../../models/user";
import { ok, serverError } from "../helpers";
import { IController, IHttpResponse } from "../protocols";
import { IGetUserRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUserRepository) {}

  async handle(): Promise<IHttpResponse<IUser[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok(users);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
