import { ValidateFunction } from 'ajv';
import { Request, Response, NextFunction } from 'express';
function validateSchema(ajv: ValidateFunction<{ [x: string]: {}; }>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv(req.body);
    if (!valid) {
      const error = ajv.errors;
      return res.status(400).send(error![0].message);
    }
    next();
  };
}

export default validateSchema;
