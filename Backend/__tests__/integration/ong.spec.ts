import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

async function createOng(){
    return await request(app)
        .post('/ongs')
        .send({
            email: "teste@teste.com",
            name: "APAD",
            whatsapp: "0000000000",
            city: "Rio do Sul",
            uf: "SC"
        });
}

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('Should be abe to list all ONGs', async () => {
        createOng();
        const response = await request(app)
            .get('/ongs');
        
        expect(response.body)
            .toContainEqual(
                expect.objectContaining({
                    email: expect.any(String),
                    name: expect.any(String),
                    whatsapp: expect.any(String),
                    city: expect.any(String),
                    uf: expect.any(String),
                    id: expect.any(String)
                })
            );
    })

    it('Should be able to create a new ONG', async () => {
        const response = await createOng();
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})
