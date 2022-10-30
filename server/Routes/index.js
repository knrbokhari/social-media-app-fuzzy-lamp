import configureUserRoutes from "./UserRoute.js";
import configureAuthRoutes from "./AuthRoute.js";
import configureChatRoutes from "./ChatRoute.js";
import configureMessageRoutes from "./MessageRoute.js";
import configurePostRoutes from "./PostRoute.js";

const configure = (app) => {
  configurePostRoutes(app);
  configureUserRoutes(app);
  configureAuthRoutes(app);
  configureChatRoutes(app);
  configureMessageRoutes(app);
};

export default configure;
