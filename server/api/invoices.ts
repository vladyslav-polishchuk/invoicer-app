import { ObjectId } from 'mongodb';
import dbPromise from '../mongodb';

export const getInvoicesFromDb = async (user_id: string) => {
  const db = await dbPromise;
  const invoicesTable = db.collection('invoices');
  const cursor = await invoicesTable.find({ user_id });
  // @ts-ignore
  const invoices = [];
  // @ts-ignore
  await cursor.forEach((invoice) => invoices.push(invoice));

  // @ts-ignore
  return invoices.map(({ _id, ...invoice }) => ({
    ...invoice,
    id: _id,
  }));
};

export const getInvoiceFromDb = async (user_id: string, invoiceId: string) => {
  const db = await dbPromise;
  const invoicesTable = db.collection('invoices');

  // @ts-ignore
  const { _id, ...invoice } = await invoicesTable.findOne({
    user_id,
    // @ts-ignore
    _id: ObjectId(invoiceId),
  });

  return { ...invoice, id: _id };
};

export const insertInvoiceToDb = async (
  user_id: string,
  data: Record<string, unknown>
) => {
  const db = await dbPromise;
  const invoicesTable = db.collection('invoices');
  // @ts-ignore
  const { _id, ...invoice } = await invoicesTable.insertOne({
    user_id,
    ...data,
  });

  return { ...invoice, id: _id };
};

export const updateInvoiceInDb = async (
  user_id: string,
  data: Record<string, unknown>
) => {
  const invoiceData = await getInvoiceFromDb(user_id, data.id as string);

  if (!invoiceData) {
    throw new Error('Invoice not found. Cannot update.');
  }

  const db = await dbPromise;
  const invoicesTable = db.collection('invoices');
  const filter = {
    // @ts-ignore
    _id: ObjectId(data.id),
  };
  const options = { upsert: true };
  const updateDoc = {
    $set: { user_id, ...data },
  };
  const invoice = invoicesTable.updateOne(filter, updateDoc, options);

  return { success: true, invoice };
};
