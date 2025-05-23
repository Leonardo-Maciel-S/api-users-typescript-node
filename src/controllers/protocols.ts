export interface IHttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface IHttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
}
