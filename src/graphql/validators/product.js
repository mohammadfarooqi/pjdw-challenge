import Joi from '@hapi/joi';

// id: ID!
// name: String!
// description: String!
// price: Float!
// image: String

const id = Joi.string().guid({ version:'uuidv4' }).required().label('Id');
const name = Joi.string().required().label('Name');
const description = Joi.string().required().label('Description');
const price =  Joi.number().positive().required().label('Price');
const image = Joi.string().required().label('Image');

export const getProductValidate = Joi.object().keys({
  id
});

export const insertProductValidate = Joi.object().keys({
  name,
  description,
  price
});

export const updateProductValidate = Joi.object().keys({
  id,
  name,
  description,
  price
});

export const deleteProductValidate = Joi.object().keys({
  id
});

export const uploadProductImageValidate = Joi.object().keys({
  id,
  image
});