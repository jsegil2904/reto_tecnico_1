import { Response } from "express";

const handleHttp = (res: Response, error: string, statusCode: number, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(statusCode);
  res.send({ error });
};

export { handleHttp };