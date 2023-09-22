import { Response } from 'express';

type TypeResponse = {
  error: boolean,
  message: string,
  data?: object | null
  info?: object | null
};

const sendGenericSuccess = (res: Response, optionals: Partial<TypeResponse> = {}) : Response => {
  const { error = false, message = '', data, info } = optionals;

  return res.status(200).json({
    error,
    message,
    data: data ?? {},
    info: info ?? {},
  });
};

const sendGenericError = (res: Response, optionals : TypeResponse = {
  message: '',
  data: {},
  info: {},
  error: true,
}) : Response => {
  const { error = true, message, data, info} = optionals;

  return res.status(500).json({
    error,
    message,
    data: data ?? {},
    info: info ?? {},
  });
};

export { TypeResponse, sendGenericError, sendGenericSuccess };
