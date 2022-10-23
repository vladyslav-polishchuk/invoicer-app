import verifyToken from '../../../server/verifyToken';
import {
  getClientsFromDb,
  insertClientToDb,
  updateClientInDb,
} from '../../../server/api/clients';
import { getInvoicesFromDb } from '../../../server/api/invoices';
import type { NextApiRequest, NextApiResponse } from 'next';

const getClients = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    let {
      sort,
      sortBy,
      offset = 0,
      limit = 20,
    } = req.query as Record<string, any>;

    if (typeof limit === 'string') {
      limit = parseInt(limit, 10);
    }

    if (typeof offset === 'string') {
      offset = parseInt(offset, 10);
    }

    const allClients = await getClientsFromDb(user.user_id, {
      sort,
      sortBy,
      offset,
      limit,
    });
    const allInvoices = await getInvoicesFromDb(user.user_id);

    const allClientsWithTotalBilledAndNumberOfInvoices = allClients.map(
      (client) => {
        const [totalBilled, invoicesCount] = allInvoices.reduce(
          (acc, item) => {
            if (item.client_id === client.id) {
              return [acc[0] + item.value, ++acc[1]];
            }
            return acc;
          },
          [0, 0]
        );

        return {
          ...client,
          totalBilled,
          invoicesCount,
        };
      }
    );

    const clients = allClientsWithTotalBilledAndNumberOfInvoices.slice(
      offset,
      offset + limit
    );
    const total = allClientsWithTotalBilledAndNumberOfInvoices.length;

    res.json({ clients, total });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const createClient = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const client = await insertClientToDb(user.user_id, req.body);

    res.json({ success: true, client });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const updateClient = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const client = await updateClientInDb(user.user_id, req.body);

    res.json({ success: true, client });
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
        return getClients(req, res, user);
      case 'POST':
        return createClient(req, res, user);
      case 'PUT':
        return updateClient(req, res, user);
      default:
        return res.status(400).send('Method not supported');
    }
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
