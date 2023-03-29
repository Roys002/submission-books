const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
          origin: ['*'],
      }
  }
  });
 
  // panggil route seperti dibawah ini agar server bisa berjalan
  server.route(routes);
  // 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();