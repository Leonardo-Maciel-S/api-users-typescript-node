import validator from "validator";

import { IUser } from "../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<IUser>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Por favor, preencha o campo ${field}`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Email não é válido",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: "Algo errado.",
      };
    }
  }
}
