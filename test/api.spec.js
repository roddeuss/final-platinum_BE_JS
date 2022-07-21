const request = require('supertest');
const app = require('../server')
const mock = jest.fn();
const path = require('path');
const mockRequest = (body = {}) => ({body});
const mockResponse = () => {
    const res = {}
    res.json = mock.mockReturnValue(res);
    res.status = mock.mockReturnValue(res);
    return res;
}

const image = path.resolve(__dirname, "./jarotstwn.jpg");

let tokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg0OTYxNjYsImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjU4NDA5NzY2fQ.zYd_aZrIbKu2OisAoKee39e2gEzjHvo56K_zdGOFbjM"

// Auth
describe('POST /login', () => {
    test('post login', async () => {
        const response = await request(app).post('/login').send({email: 'test@test.test', password: 'testtest'});;
        expect(response.status).toBe(200);
    })
});
describe('fail POST /login', () => {
    test('fail post login', async () => {
        const response = await request(app).post('/login').send({email: 'test@test.tes', password: 'testtest'});;
        expect(response.status).toBe(200);
    })
});
// describe('POST /regitser', () => {
//     test('post register', async () => {
//         const response = await request(app).post('/register').send({name: "user", username: 'user@user.user', password: 'useruser'});;
//         expect(response.status).toBe(200);
//     })
// });
describe('GET /whoami', () => {
    test('get whoami', async () => {
        const response = await request(app).get('/whoami').set('Authorization', tokenJWT);;
        expect(response.status).toBe(200);
    })
});

// Product
describe('GET /AllProduct?tab=&cat=&search=', () => {
    test('get product', async () => {
        const response = await request(app).get('/AllProduct?tab=&cat=&search=').set('Authorization', tokenJWT);
        expect(response.status).toBe(200);
    })
});
describe('GET /product/user', () => {
    test('get product/user', async () => {
        const response = await request(app).get('/product/user').set('Authorization', tokenJWT);
        expect(response.status).toBe(200);
    })
});
describe('fail POST /product', () => {
    test('fail post product', async () => {
        const response = await request(app).post('/product')
        expect(response.status).toBe(401);
    })
});
// describe('POST /product', () => {
//     test('post product', async () => {
//         const response = await request(app).post('/product').set('Authorization', tokenJWT)
//         .set('consumes', 'multipart/form-data')
//         .field("name", "test name")
//         .field("category", "test category")
//         .field("price", "999")
//         .field("description", "test description")
//         .field("publish", "true")
//         // .send({name: "test name", category: "test category", price: "999", description: "test description", public: true})
//         .attach("image", image);
//         expect(response.status).toBe(200);
//     })
// });
// describe('GET /product/:id', () => {
//     test('get product/:id', async () => {
//         const response = await request(app).get('/product/2')
//         expect(response.status).toBe(200);
//     })
// });
// describe('PUT /product/:id', () => {
//     test('put product/:id', async () => {
//         const response = await request(app).put('/product/2').set('Authorization', tokenJWT)
//         .set('consumes', 'multipart/form-data')
//         .field("name", "test put name")
//         .field("category", "test put category")
//         .field("price", "998")
//         .field("description", "test put description")
//         .field("publish", "true")
//         // .send({name: "test name", category: "test category", price: "999", description: "test description", public: true})
//         .attach("image", image);
//         expect(response.status).toBe(200);
//     })
// });
// describe('DELETE /product/:id', () => {
//     test('delete product/:id', async () => {
//         const response = await request(app).delete('/product/2').set('Authorization', tokenJWT)
//         expect(response.status).toBe(200);
//     })
// });
describe('GET /product/user/sold', () => {
    test('get product sold', async () => {
        const response = await request(app).get('/product/user/sold').set('Authorization', tokenJWT)
        expect(response.status).toBe(200);
    })
});

// Notif
describe('GET /notif', () => {
    test('get notif', async () => {
        const response = await request(app).get('/notif').set('Authorization', tokenJWT)
        expect(response.status).toBe(200);
    })
});
describe('DELETE /notif/:notifId', () => {
    test('delete notif', async () => {
        const response = await request(app).delete('/notif/asd').set('Authorization', tokenJWT)
        expect(response.status).toBe(200);
    })
});
