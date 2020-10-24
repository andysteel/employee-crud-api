import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

let isSyncronize: boolean = false;
if (process.env.NODE_ENV === 'development') {
  isSyncronize = true;
}
export const connection = async () => await createConnection({
  type: 'postgres',
  url: process.env.DS_URL,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
  logNotifications: isSyncronize,
  //log for debug
  //logging: ['query'],
}).catch((error) => { throw new Error(`Erro ao tentar conexão com o banco.${error}`); });
