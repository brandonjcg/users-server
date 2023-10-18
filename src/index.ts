import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import sequelize from './models';
import routes from './routes';
import * as swaggerDocument from './swagger.json';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 3000;

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  sequelize.authenticate();
  console.log(`Server running on port ${PORT}`);
});

export default app;
