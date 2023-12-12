import { Request, Response } from "express";
import {  verifyCardService} from "../services/card.services";
import { handleHttp } from "../utils/error.handle";

const verifyCard =async (req: Request, res:Response) => {
    try{
        const responseCard = await verifyCardService(req, res);
        res.send(responseCard);
    }
    catch(e){
        const errHandle =  handleHttp(res,String(e),400);
        return errHandle;
    }
    
};

export { verifyCard };