import { Request, Response } from 'express';

export type TypeResponse = {
  error: boolean,
  message: string,
  data?: object | null
  info?: object | null
};

export const sendGenericSuccess = (
  res: Response,
  optionals: Partial<TypeResponse> = {},
) : Response => {
  const {
    error = false, message = '', data, info,
  } = optionals;

  return res.status(200).json({
    error,
    message,
    data: data ?? {},
    info: info ?? {},
  });
};

export const sendGenericError = (res: Response, optionals : TypeResponse = {
  message: '',
  data: {},
  info: {},
  error: true,
}) : Response => {
  const {
    error = true, message, data, info,
  } = optionals;

  return res.status(500).json({
    error,
    message,
    data: data ?? {},
    info: info ?? {},
  });
};

export const getResultsAndPageFromQuery = (req: Request) => {
  const page = Number(req.query.page) || 1;
  const results = Number(req.query.results) || 10;

  return {
    page,
    results,
  };
};
