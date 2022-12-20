import ajv from './student.model.ajv';
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    entryTime: { type: 'string', format: 'date' },
    exitTime: { type: 'string', format: 'date' },
    totalTime: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: false,
};

const registerSchema = ajv.compile(schema);

export default registerSchema;
