import { login } from "./controllers/authorization.controller";

const routesConfig = (app) => {
    app.post('/auth', login);
  };
  
  export default routesConfig;