import { IUser } from "../../models/user";
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
        return {
          statusCode: 400,
          body: "Id do usuário não informado.",
        };
      }

      const user = await this.deleteUserRepository.delete(id);

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
