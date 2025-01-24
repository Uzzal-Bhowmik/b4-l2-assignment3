type TErrorSources = {
  path: string;
  message: string;
};

export type TErrorObj = {
  errorSources: TErrorSources[];
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TErrorObj;
};
