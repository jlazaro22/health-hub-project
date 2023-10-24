import { app } from './app';
import { env } from './env';

app
	.listen({
		host: '127.0.0.1',
		port: env.PORT,
	})
	.then((address) => console.log('🚀 Http server up on ' + address))
	.catch((err) => console.error(err));
