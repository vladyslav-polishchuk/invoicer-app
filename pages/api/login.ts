import jwt from 'jsonwebtoken';
import dbPromise from '../../server/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }

    const db = await dbPromise;
    const users = db.collection('user');
    const user = await users.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY ?? '',
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      token,
      user_id: user.id,
      email: user.email,
      name: user.name,
      companyDetails: user.companyDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

export default index;
