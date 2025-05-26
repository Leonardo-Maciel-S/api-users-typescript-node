import { IUser } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: IHttpRequest<unknown>
  ): Promise<IHttpResponse<IUser>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Id do usuário não informado.");
      }

      const user = await this.deleteUserRepository.delete(id);

      return ok(user);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
