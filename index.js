import express, { json } from 'express';
import config from './common/config/env.config';
import connectDatabase from './common/services/mongoose.service';
import adminRoute from './admin/routes.config';
import routesConfig from './authorization/route.config';
import studentRoutes from './students/routes.config'

const app = express();
app.use(json());

connectDatabase();
adminRoute(app);
studentRoutes(app);
routesConfig(app);
let port = config.PORT;
app.listen(port, () => {
  console.log(`app is running on port${port}`);
});
