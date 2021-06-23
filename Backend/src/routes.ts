import { Router } from 'express';

import ongs from './controller/ongs.controller';
import profile from './controller/profile.controller';
import incidents from './controller/incidents.controller';
import sessions from './controller/session.controller';

import { ongCreationValidation } from './validator/ong.validator';
import { deletingIncidentsValidator, getIncidentsPageValidator } from './validator/incident.validator';
import { getPorfileIncidentsValidation } from './validator/profile.validator';

const routes = Router();

routes.get('/ongs', ongs.listAll);
routes.post('/ongs', [ ongCreationValidation, ongs.create ]);

routes.get('/incidents', [ getIncidentsPageValidator, incidents.listAll ]);
routes.post('/incidents', incidents.create);
routes.delete('/incidents/:id', [ deletingIncidentsValidator, incidents.delete ]);

routes.get('/profile', [ getPorfileIncidentsValidation, profile.listAllIncidents ]);

routes.post('/sessions', sessions.authenticate);

export default routes;