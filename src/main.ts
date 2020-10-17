import { SetupServer } from './server';

const server = new SetupServer();

const port = process.env.SERVER_PORT || '';
server.start(parseInt(port));
