import dbPromise from '../../server/mongodb';
import verifyToken from '../../server/verifyToken';
import type { NextApiRequest, NextApiResponse } from 'next';

const getCompanyDetails = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const db = await dbPromise;
    const users = db.collection('user');
    const foundUser = await users.findOne({ email: user.email });
    if (!foundUser) {
      throw new Error('User not found');
    }

    foundUser.companyDetails ??= null;

    return res.json(foundUser);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const updateCompanyDetails = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const db = await dbPromise;
    const users = db.collection('user');
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = {
      $set: { companyDetails: req.body },
    };
    await users.updateOne(filter, updateDoc, options);
    const updatedUser = await users.findOne({ email: user.email });

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await verifyToken(req);
    const method = req.method;

    switch (method) {
      case 'GET':
        return getCompanyDetails(req, res, user);
      case 'PUT':
        return updateCompanyDetails(req, res, user);
      default:
        return res.status(400).send('Method not supported');
    }
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
