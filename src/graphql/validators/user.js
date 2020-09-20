import Joi from '@hapi/joi';

// id: ID!
// firstName: String!
// lastName: String!
// email: String!
// products: [Product!]!

const id = Joi.string().guid({ version:'uuidv4' }).required().label('Id');
const firstName = Joi.string().max(255).required().label('First Name');
const lastName = Joi.string().max(255).required().label('Last Name');
const email = Joi.string().required().label('Email');

export const loginValidate = Joi.object().keys({
  email
});

export const addProductToUserValidate = Joi.object().keys({
  id
});
