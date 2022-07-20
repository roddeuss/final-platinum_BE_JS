const request = require('supertest');
const app = require('../server')
const mock = jest.fn();
const mockRequest = (body = {}) => ({body});
const mockResponse = () => {
    const res = {}
    res.json = mock.mockReturnValue(res);
    res.status = mock.mockReturnValue(res);
    return res;
}

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg0MTc4NTYsImlkIjo3LCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjU4MzMxNDU2fQ.3EjxsmZ0I9-jL1Wd-orJMDVfrlNTt1ghCWwJmBreYE0

// Auth
describe('POST /login', () => {
    test('post login', async () => {
        const response = await request(app).post('/login').send({username: 'test@test.test', password: 'test'});;
        expect(response.status).toBe(200);
    })
});
// describe('POST /regitser', () => {
//     test('post register', async () => {
//         const response = await request(app).post('/register').send({name: "user", username: 'user@user.user', password: 'useruser'});;
//         expect(response.status).toBe(200);
//     })
// });
