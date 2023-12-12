import { Request, Response } from "express";
import { signInService } from "../services/card.services";
import { handleHttp } from "../utils/error.handle";


const signIn =async ({body}: Request, res:Response) => {
    const {email, card_number,cvv, expiration_year, expiration_month} = body;
    const responseCard = await signInService({email, card_number, cvv, expiration_year, expiration_month});
    res.send(responseCard);
};

export { signIn };