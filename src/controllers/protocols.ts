export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T | string;
}

export interface IHttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
