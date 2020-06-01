import { celebrate, Segments, Joi } from 'celebrate';

export const getPorfileIncidentsValidation = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown(),
})