export interface IHttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface IHttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
