import { client } from "../db/database";
import { Entity, Schema, Repository } from "redis-om";
import { Card } from "../interfaces/card.interface";

//class Card extends Entity {}

const cardSchema = new Schema('Card',
  {
    token: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    card_number: {
      type: 'string'
    },
    cvv: {
        type: 'string'
    },
    expiration_year: {
        type: 'string'
    },
    expiration_month: {
        type: 'string'
    }
  }
)
export const cardRepository = new Repository(cardSchema, client)

