import { Request, Response } from 'express';
import connection from '../database/connection';

const tableName: string = 'ongs';

const sessions = {
    // async listAllIncidents(req: Request, res: Response): Promise<Response> {
    // },

    async authenticate(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;

        const ong = await connection(tableName)
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return res.status(400).json({
                message: 'Error',
                error: 'No ONG found with this ID'
            })
        }

        return res.json( ong );
    },

    // async delete(req: Request, res: Response): Promise<Response> {
    // }
}

export default sessions;