import { ObjectId } from 'mongodb';
import dbPromise from '../mongodb';

export const getClientsFromDb = async (
  user_id: string,
  options = { sort: null, sortBy: null, offset: 0, limit: 20 }
) => {
  const { sort, sortBy, offset, limit } = options;
  const db = await dbPromise;
  const clientsTable = db.collection('clients');
  const cursor = await clientsTable.find({ user_id }).sort({
    // @ts-ignore
    [sortBy]: sort === 'asc' ? 1 : -1,
  });
  // @ts-ignore
  const clients = [];
  // @ts-ignore
  await cursor.forEach((client) => clients.push(client));

  // @ts-ignore
  return clients.map(({ _id, ...client }) => ({
    ...client,
    id: _id,
  }));
};

export const getClientFromDb = async (user_id: string, clientId: string) => {
  const db = await dbPromise;
  const clientsTable = db.collection('clients');

  // @ts-ignore
  const { _id, ...client } = await clientsTable.findOne({
    user_id,
    // @ts-ignore
    _id: ObjectId(clientId),
  });

  return { ...client, id: _id };
};

export const insertClientToDb = async (
  user_id: string,
  data: Record<string, unknown>
) => {
  const db = await dbPromise;
  const clientsTable = db.collection('clients');
  // @ts-ignore
  const { _id, ...client } = await clientsTable.insertOne({
    user_id,
    ...data,
  });

  return { ...client, id: _id };
};

export const updateClientInDb = async (
  user_id: string,
  data: Record<string, unknown>
) => {
  const clientData = await getClientFromDb(user_id, data.id as string);

  if (!clientData) {
    throw new Error('Client not found. Cannot update.');
  }

  const db = await dbPromise;
  const clientsTable = db.collection('clients');
  const filter = {
    // @ts-ignore
    _id: ObjectId(data.id),
  };
  const options = { upsert: true };
  const updateDoc = {
    $set: { user_id, ...data },
  };
  const client = clientsTable.updateOne(filter, updateDoc, options);

  return { success: true, client };
};
