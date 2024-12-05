import { Router } from 'express';

import { ordersRoutes } from './orders-routes';
import { productsRoutes } from './products-routes';
import { tablesRoutes } from './tables-routes';
import { tablesSessionsRoutes } from './tables-sessions-routes';

const routes = Router();

routes.use("/orders", ordersRoutes);
routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/tables-sessions", tablesSessionsRoutes);

export { routes }