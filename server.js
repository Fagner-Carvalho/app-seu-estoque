import express from 'express';
import { resolve } from 'path';

const app = express();

app.use('/', express.static(
  resolve(__dirname, '.build'),
));

app.listen(
  // eslint-disable-next-line consistent-return
  process.env.PORT || 3000, (err) => {
    if (err) { return console.log(err); }

    console.log('app running');
  },
);
