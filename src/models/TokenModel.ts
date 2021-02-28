import { Schema, Document, Model, model } from "mongoose";
import cryptoRandomString from "crypto-random-string";

export type Status = "pending" | "complete" | "failed";

export interface iToken {
  payload: string;
  status: Status;
}

interface iTokenDocument extends iToken, Document {}

const TokenSchema = new Schema({
  payload: {
    type: String,
    default: () => cryptoRandomString({ length: 6, type: "url-safe" }),
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

export const TokenModel = model<iTokenDocument>("Token", TokenSchema);
