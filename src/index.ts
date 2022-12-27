import express, { json } from 'express';
import config from './common/config/env.config';
import connectDatabase from './common/services/mongoose.service';
import adminRoutes from './admin/routes.config';
import routesConfig from './authorization/route.config';
import studentRoutes from './students/routes.config';
import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.get('/student/', (req, res) => {
  res.render('student');
});
app.get('/admin/', (req, res) => {
  res.render('admin');
});
app.use(express.static('./public'));
connectDatabase();
adminRoutes(app);
studentRoutes(app);
routesConfig(app);
let port = config.PORT;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
