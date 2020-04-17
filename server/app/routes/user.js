module.exports = app => {
  app.router.post('/api/user/login', app.controller.user.login);
  app.router.post('/api/user/register', app.controller.user.register);
  app.router.post('/api/user/logout', app.controller.user.logout);
  app.router.get('/api/user/info', app.controller.user.info);
  app.router.get('/api/user/lists', app.controller.user.lists);
  app.router.post('/api/user/edit', app.controller.user.edit);
  app.router.post('/api/user/delete', app.controller.user.delete);
  app.router.post('/api/user/password', app.controller.user.password);
}