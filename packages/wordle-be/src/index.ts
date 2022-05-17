import app from '@/app';
import {PORT, HOST} from '~/config';

const bootstrap = () => app.listen(PORT, () => {
  console.log(`Server started at ${HOST}`);
});
bootstrap();
