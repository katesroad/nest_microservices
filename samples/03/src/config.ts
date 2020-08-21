import { Transport } from '@nestjs/microservices';
import { Web3Server } from './web3-server';

export const config = () => ({
  app: {
    name: 'Server',
    port: process.env['app_port'] || 8080,
  },

  ['service:web3']: {
    strategy: new Web3Server(process.env.wss_url),
  },
});
