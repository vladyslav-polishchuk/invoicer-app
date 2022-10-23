import verifyToken from '../../../server/verifyToken';
import { getInvoiceFromDb } from '../../../server/api/invoices';
import type { NextApiRequest, NextApiResponse } from 'next';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await verifyToken(req);
    // @ts-ignore
    const invoice = await getInvoiceFromDb(user.user_id, req.query.id);

    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    return res.json({ success: true, invoice });
  } catch (err: unknown) {
    res.status(500).send((err as Error).message);
  }
};

export default index;
