import 'module-alias/register';
import { SetupServer } from './server';

const server = new SetupServer();

const port = process.env.PORT || '8080';
server.start(parseInt(port));
