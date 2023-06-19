import { Db, Collection } from 'mongodb';

interface IComment {
  id: string;
  username: string;
  email: string;
  hashedPassword: string;
  comment: string;
  createdAt: Date;
}

const commentCollection = (db: Db): Collection<IComment> => {
  return db.collection<IComment>('comments');
};

export { commentCollection , IComment};