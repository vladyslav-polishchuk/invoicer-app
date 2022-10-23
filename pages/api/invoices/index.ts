import verifyToken from '../../../server/verifyToken';
import {
  getInvoicesFromDb,
  insertInvoiceToDb,
  updateInvoiceInDb,
} from '../../../server/api/invoices';
import { getClientFromDb } from '../../../server/api/clients';
import type { NextApiRequest, NextApiResponse } from 'next';

const getInvoices = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    let {
      clientId,
      projectCode,
      startDate,
      endDate,
      startDueDate,
      endDueDate,
      sort = 'asc',
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

    const allInvoices = await getInvoicesFromDb(user.user_id);
    const allResults = [];
    for (let i = 0; i < allInvoices.length; i++) {
      allResults.push({
        invoice: allInvoices[i],
        client: await getClientFromDb(user.user_id, allInvoices[i].client_id),
      });
    }

    let filteredResults = allResults;

    if (clientId) {
      filteredResults = filteredResults.filter((item) => {
        return item.client.id === clientId;
      });
    }

    if (projectCode) {
      filteredResults = filteredResults.filter((item) => {
        return item.invoice.projectCode === projectCode;
      });
    }

    if (startDate) {
      filteredResults = filteredResults.filter((item) => {
        return item.invoice.date >= startDate;
      });
    }

    if (endDate) {
      filteredResults = filteredResults.filter((item) => {
        return item.invoice.date < endDate;
      });
    }

    if (startDueDate) {
      filteredResults = filteredResults.filter((item) => {
        return item.invoice.dueDate >= startDueDate;
      });
    }

    if (endDueDate) {
      filteredResults = filteredResults.filter((item) => {
        return item.invoice.dueDate < endDueDate;
      });
    }

    const invoices = filteredResults.slice(offset, offset + limit);
    const total = filteredResults.length;

    return res.json({ invoices, total });
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

const createInvoice = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const invoice = await insertInvoiceToDb(user.user_id, req.body);

    return res.json({ success: true, invoice });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const updateInvoice = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  try {
    const invoice = await updateInvoiceInDb(user.user_id, req.body);

    return res.json({ success: true, invoice });
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
        return getInvoices(req, res, user);
      case 'POST':
        return createInvoice(req, res, user);
      case 'PUT':
        return updateInvoice(req, res, user);
      default:
        return res.status(400).send('Method not supported');
    }
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
