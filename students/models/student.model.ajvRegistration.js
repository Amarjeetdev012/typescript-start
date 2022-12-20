import ajv from './student.model.ajv';
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format:'email' },
    password: { type: 'string' },
    userName: { type: 'string' },
  },
  required: ['name', 'email', 'password', 'userName'],
  additionalProperties: false,
};

const registerSchema = ajv.compile(schema);

export default registerSchema
