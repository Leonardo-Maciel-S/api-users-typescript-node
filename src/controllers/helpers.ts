export const ok = <T>(body: T) => {
  return {
    statusCode: 200,
    body,
  };
};

export const created = <T>(body: T) => {
  return {
    statusCode: 201,
    body,
  };
};

export const badRequest = (msg: string) => {
  return {
    statusCode: 400,
    body: msg,
  };
};

export const serverError = () => {
  return {
    statusCode: 500,
    body: "Algo deu errado.",
  };
};
