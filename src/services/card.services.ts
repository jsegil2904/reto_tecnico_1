import { Card } from "../interfaces/card.interface";
import { cardRepository } from "../models/card";
//import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { handleHttp } from "../utils/error.handle";
import { Request, Response } from "express";
import { client } from "../db/database";
import { z } from "zod";



const schemaValidation = z.object({
  
  email: z.string().email().endsWith('yahoo.es').or(z.string().email().endsWith('gmail.com')),
  card_number: z.string(),
  cvv: z.number().min(100).max(9999),
  expiration_year: z.enum(['2023', '2024', '2025', '2026','2027','2028']),
  expiration_month: z.number().min(1).max(12),
});


const signInService = async ({ email, card_number, cvv, expiration_year, expiration_month }: Card) => {
try{
    const isValidData = schemaValidation.parse({ email, card_number, cvv, expiration_year, expiration_month });
    
    console.log("Es valido la información:"+isValidData);
    const checkIs = await cardRepository.search()
      .where('email').equals(email)
      .return.all()
    console.log(checkIs)
    if (!checkIs.length) {
      
      await cardRepository.createIndex();
      const token = generateToken(email);
      await cardRepository.save({token, email, card_number, cvv, expiration_year, expiration_month });
      await cardRepository.expire(token, 5);
      
      const res = {
        success: true,
        card: { token, email, card_number, expiration_year, expiration_month },
        message: "token creado satisfactoriamente"
      };
      return res;
    }
    else{
      const res = {
        success : false,
        token : '',
        card : {},
        message: "La tarjeta con el usuario indicado, ya ha sido registrada"
      }
      return res;
    }
  }
  catch(err){
    return err
  }
  

  // const passwordHash = checkIs.password; //TODO el encriptado!
  // const isCorrect = await verified(password, passwordHash);
  
  // if (!isCorrect) return "PASSWORD_INCORRECT";v

  // const token = generateToken(checkIs.email);
  
  
};

const verifyCardService = async ({ headers }: Request, res: Response) => {
  const { authorization } = headers;
  const authT = authorization ?? " ";
  const tokenHeader = authT.split(" ").pop() ?? "";
  //const checkToken = await cardRepository.fetch(tokenHeader);

  const checkToken = await cardRepository.search()
    .where('token').equals(tokenHeader)
    .return.all()
  console.log(checkToken);
  if (!checkToken.length) {
    const errHandle = await handleHttp(res,"token no encontrado",403);
    return errHandle;
  }
  else{
    const res = {
      success: true,
      card: {'email': checkToken[0].email, 
        'card_number': checkToken[0].card_number,
        'expiration_year': checkToken[0].expiration_year,
        'expiration_month': checkToken[0].expiration_month
      },
      message: "OK"
    };
    return res;
  } 
    
  
  
  
  
  
};



export { signInService , verifyCardService};