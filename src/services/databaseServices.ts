import { iToken, Status, TokenModel } from "../models/TokenModel";

export const createToken = async () => {
  const token = await new TokenModel();
  return token.save();
};

export const findToken = async (payload) => {
  const token = await TokenModel.findOne(payload);
  return token;
};

export const changeTokenStatus = async (status: Status, payload: string) => {
  const token = await TokenModel.findOne({ payload });
  token.status = status;
  return token.save();
};
