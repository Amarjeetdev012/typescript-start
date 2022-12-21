import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    userName: { type: 'string'},
    password: { type: 'string' },
  },
  required: ['userName', 'password'],
  additionalProperties: false,
};

const studentloginSchema = ajv.compile(schema);

export default studentloginSchema;