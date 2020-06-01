import { celebrate, Segments, Joi } from 'celebrate';

export const getIncidentsPageValidator = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
})

export const deletingIncidentsValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})