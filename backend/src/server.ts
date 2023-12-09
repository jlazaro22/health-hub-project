import { app } from './app';
import { env } from './env';

app
	.listen({
		host: 'localhost',
		port: env.PORT,
	})
	.then((address) => console.log('🚀 Http server up on ' + address))
	.catch((err) => console.error(err));
