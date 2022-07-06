import * as Joi from 'joi';

const configValidationSchema = Joi.object({
  ENV: Joi.string().required().valid('dev', 'prod'),
  HOST_PORT: Joi.number().default(3000).required(),
  DATABASE_HOST: Joi.string().required().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432).required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRESIN: Joi.number().required(),
});

export { configValidationSchema };
