import routers from './router';

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routers;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
