import { Request, Response } from 'express';
import connection from '../database/connection';

const tableName: string = 'incidents';

const incidents = {
    async listAll(req: Request, res: Response): Promise<Response> {
        const { page = 1 } = req.query;

        const [count] = await connection(tableName).count();

        const incidents = await connection(tableName)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(
                tableName + '.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            );

        return res
            .header('X-Total-Count', count?.count)
            .header('X-Total-Page', (count?.count/5).toFixed(0))
            .json(incidents);
    },

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const ong_id = req.headers.authorization;
            const { title, description, value } = req.body;

            await connection(tableName).insert({
                ong_id,
                title,
                description,
                value
            });

            return res.json({ message: 'OK' });
        } catch (err) {
            return res.status(400).json({
                message: 'Error',
                error: err
            })
        }
    },

    async delete(req: Request, res: Response): Promise<Response> {
        const ong_id = req.headers.authorization;
        const { id } = req.params;
        
        const incident = await connection(tableName)
            .where('id', parseInt(id))
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({
                message: 'Error',
                error: 'Creation ONG differs from current ONG'
            });
        }

        await connection(tableName).where('id', id).delete();

        return res.status(204).send();
    }
}

export default incidents;