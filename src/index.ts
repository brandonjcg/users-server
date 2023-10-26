import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import sequelize from './models';
import routes from './routes';
import * as swaggerDocument from './swagger.json';
import { sendGenericSuccess } from './utils';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 3000;

app.use('/api/v1', routes);

app.get('/', (req, res) => sendGenericSuccess(res, {
  message: 'Welcome to the Users API 🚀',
}));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => res.status(404).json({
  error: true,
  message: 'Route not found',
  data: {},
  info: {},
}));

app.listen(PORT, () => {
  sequelize.authenticate();
  console.log(`Server running on port ${PORT}`);
});

export default app;
