import type { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '../../server/mongodb';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!(name && email && password && confirmPassword)) {
      res.status(400).send('All inputs are required');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Password and Confirm Password do not match');
    }

    const db = await dbPromise;
    const users = db.collection('user');
    const user = await users.findOne({ email });
    if (user) {
      return res.status(400).send('Email already used by another account');
    }

    const { insertedId } = await users.insertOne({
      name,
      email,
      password,
    });

    return res.status(200).json({
      user_id: insertedId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

export default index;
