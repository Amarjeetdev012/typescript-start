import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

const loginSchema = ajv.compile(schema);

export default loginSchema;