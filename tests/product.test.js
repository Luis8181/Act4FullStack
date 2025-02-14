const app = require('../src/server');  //Importa la instancia del servidor
const request = require('supertest');   //Usa supertest para hacer solicitudes HTTP

let server;  //Variable global para el servidor

beforeAll((done) => {
  server = app.listen(5001, done);
});

afterAll((done) => {
  if (server) {
    server.close(done);  //Cierra el servidor después de las pruebas
  } else {
    done(); 
  }
});

describe('GET /api/products', () => {
  it('debe devolver todos los productos', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0); 
  });
});
