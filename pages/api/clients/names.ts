import verifyToken from '../../../server/verifyToken';
import { getClientsFromDb } from '../../../server/api/clients';
import type { NextApiRequest, NextApiResponse } from 'next';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await verifyToken(req);
    // @ts-ignore
    const allClients = await getClientsFromDb(user.user_id);
    const clients = allClients.map((client) => ({
      id: client.id,
      companyName: client.companyDetails.name,
    }));

    return res.json({ success: true, clients });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
