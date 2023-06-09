import * as jose from 'jose';
import { createSecretKey } from 'crypto';

const genKey = async () => {
  const privateKey = createSecretKey(process.env.SECRET_KEY as any);

  return privateKey;
};

export const createToken = async (userId: number): Promise<string> => {
  const token = await new jose.SignJWT({ uid: userId })
    .setProtectedHeader({
      alg: process.env.ALGO as string,
    })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(await genKey());
  return await token;
};

export const verifyToken = async (token: string): Promise<{ uid: number }> => {
  const privateKey = await genKey();
  const { payload } = await jose.jwtVerify(token, privateKey);

  return payload as { uid: number };
};

export const decodeToken = (token: string) => {
  const decoded = jose.decodeJwt(token);

  return decoded as { uid: number };
};
