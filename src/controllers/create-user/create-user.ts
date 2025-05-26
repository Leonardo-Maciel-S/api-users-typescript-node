import validator from "validator";

import { IUser } from "../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<CreateUserParams>
  ): Promise<IHttpResponse<IUser>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Por favor, preencha o campo ${field}`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email não é válido");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created(user);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
