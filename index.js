import express, { json } from 'express';
import config from './common/config/env.config';
import connectDatabase from './common/services/mongoose.service';
import adminRoute from './admin/routes.config';
import routesConfig from './authorization/route.config';
import studentRoutes from './students/routes.config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.use(express.static('./public'));
connectDatabase();
adminRoute(app);
studentRoutes(app);
routesConfig(app);
let port = config.PORT;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
