import { IUser } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  IUpdateUSerController,
  IUpdateUserParams,
  IUpdateUserRepository,
} from "./protocols";

export class UpdateUserController implements IUpdateUSerController {
  constructor(private updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<IUser>> {
    try {
      const { id } = httpRequest.params;
      const body = httpRequest.body;

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
