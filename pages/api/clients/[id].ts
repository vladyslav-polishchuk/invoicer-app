import verifyToken from '../../../server/verifyToken';
import { getClientFromDb } from '../../../server/api/clients';
import type { NextApiRequest, NextApiResponse } from 'next';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await verifyToken(req);
    // @ts-ignore
    const client = await getClientFromDb(user.user_id, req.query.id);

    if (!client) {
      return res.status(404).send('Client not found');
    }

    return res.json({ success: true, client });
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
