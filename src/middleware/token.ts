import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/req.token";
import { verifyToken } from "../utils/jwt.handle";
import { handleHttp } from "../utils/error.handle";

const verifyJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByEmail = req.headers.authorization || "";
    const jwt = jwtByEmail.split(" ").pop();
    //console.log(jwt);
    const isEmail = verifyToken(`${jwt}`) as { email: string };
    if (!isEmail) {
        const errHandle =  handleHttp(res,"TOKEN_INVALIDO",401);
        return errHandle;
    } else {
      req.card = isEmail;
      next();
    }
  } catch (e) {
    console.log({ e });
    const errHandle =  handleHttp(res,String(e),400);
    return errHandle;
  }
};

export { verifyJwt };