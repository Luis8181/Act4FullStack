const app = require('../src/server');  //Importa la instancia del servidor
const request = require('supertest');   //Usa supertest para hacer solicitudes HTTP

let server;  //Variable global para el servidor

beforeAll((done) => {
  server = app.listen(5001, done);  //Usa un puerto diferente si 5000 está ocupado
});

afterAll((done) => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

describe("Product Controller", () => {
  it('debería crear un nuevo producto', async () => {
    const res = await request(server).post('/api/products').send({
      name: 'Producto de prueba',
      price: 100
    });
    expect(res.status).toBe(201);  //Espera que el producto sea creado
    expect(res.body.name).toBe('Producto de prueba');
    expect(res.body.price).toBe(100);
  });

  it('debería obtener todos los productos', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1); 
  });
});
