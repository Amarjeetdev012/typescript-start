import Ajv from 'ajv';
import ajv from './student.model.ajv';

const schema = {
  type: 'object',
  properties: {
    userName: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['userName', 'password'],
  additionalProperties: false,
};

const loginSchema = ajv.compile(schema);

export default loginSchema 
