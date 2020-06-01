import { Request, Response } from 'express';
import connection from '../database/connection';

const tableName: string = 'incidents';

const profile = {
    async listAllIncidents(req: Request, res: Response): Promise<Response> {
        const ong_id = req.headers.authorization;

        const incidents = await connection(tableName)
        .where('ong_id', ong_id)
        .select('*');

        return res.json({ incidents });
    }
}

export default profile;