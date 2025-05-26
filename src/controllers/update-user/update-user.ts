import { IUser } from "../../models/user";
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
        return {
          statusCode: 400,
          body: "Campos vazios",
        };
      }

      if (!id) {
        return {
          statusCode: 500,
          body: "Id não informado.",
        };
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
        return {
          statusCode: 400,
          body: "Recebemos algum campo não permitido para atualização",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 500,
        body: "Algo deu errado.",
      };
    }
  }
}
