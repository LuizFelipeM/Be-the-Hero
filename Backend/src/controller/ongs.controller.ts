import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';

const tableName: string = 'ongs';

const ongs = {
    async listAll(req: Request, res: Response): Promise<Response> {
        return res.json(await connection(tableName).select('*'))
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { email, name, whatsapp, city, uf } = req.body;
        const id = generateUniqueId();

        await connection(tableName).insert({
            id,
            email,
            name,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    }
}

export default ongs;