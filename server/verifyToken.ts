import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next';

const verifyToken = async (req: NextApiRequest) => {
  let token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (req.headers['authorization']) {
    token = req.headers['authorization'].replace('Bearer ', '');
  }

  if (!token) {
    throw new Error('A token is required for authentication');
  }

  try {
    return jwt.verify(token, process.env.TOKEN_KEY ?? '');
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

export default verifyToken;
