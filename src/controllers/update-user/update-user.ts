import { IUser } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<IUpdateUserParams>
  ): Promise<IHttpResponse<IUser>> {
    try {
      const { id } = httpRequest.params;
      const body = httpRequest.body;

      if (!body) {
        return badRequest("Campos vazios");
      }

      if (!id) {
        return badRequest("Id não informado.");
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest(
          "Recebemos algum campo não permitido para atualização"
        );
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok(user);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
