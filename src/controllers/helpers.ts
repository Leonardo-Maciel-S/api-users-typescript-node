import { HttpStatusCode } from "./protocols";

export const ok = <T>(body: T) => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};

export const created = <T>(body: T) => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
};

export const badRequest = (msg: string) => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: msg,
  };
};

export const serverError = () => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Algo deu errado.",
  };
};
