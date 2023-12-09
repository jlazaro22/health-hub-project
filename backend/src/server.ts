import { app } from './app';
import { env } from './env';

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then((address) => console.log('🚀 Http server up on ' + address))
	.catch((err) => console.error(err));
