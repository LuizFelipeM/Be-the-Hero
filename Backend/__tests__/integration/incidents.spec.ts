import request from 'supertest';

import app from '../../src/app';
import connection from "../../src/database/connection";

const testRoute = '/incidents';

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

async function createIncident(id: string): Promise<request.Response> {
    return await request(app)
        .post(testRoute)
        .set({ Authorization: id })
        .send({
            title: 'Test de incident',
            description: 'Descrição de teste sobre o caso',
            value: 1500
        });
}

async function listAllIncident(): Promise<request.Response> {
    return await request(app)
        .get(testRoute)

}

describe('Incidents', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    })

    it(`Should create a incident to ONG`, async () => {
        const { id } = (await createOng()).body;
        const res = (await createIncident(id)).body;

        expect(res).toHaveProperty('message');
        expect(res.message).toBe('OK');
    })

    it(`Should list all incidents of ONG`, async () => {
        const { id } = (await createOng()).body;
        await createIncident(id);

        const res = await listAllIncident();

        expect(res.header).toEqual(
            expect.objectContaining({
                'x-total-count': expect.any(String),
                'x-total-page': expect.any(String)
            })
        );
        expect(res.body).toContainEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ong_id: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                value: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                whatsapp: expect.any(String),
                city: expect.any(String),
                uf: expect.any(String)
            })
        );
    })

    it(`Should delete a incident of ONG`, async () => {
        const { id } = (await createOng()).body;
        await createIncident(id);
        const incident = await listAllIncident();

        const res = await request(app)
            .delete(testRoute + `/${parseInt(incident.body[0].id)}`)
            .set({ Authorization: id });

        expect(res.status).toEqual(204);
    })
})