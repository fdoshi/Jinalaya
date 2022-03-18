const Joi = require('joi');

module.exports.bhaktidhamSchema = Joi.object({
    bhaktidham: Joi.object({
        title: Joi.string().required(),
        mulnayak: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required()
    }).required()
})