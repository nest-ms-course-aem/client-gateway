import 'dotenv/config'
import * as joi from 'joi'

//Defines the interface of the envs
interface IEnvVars { 
    PORT: number,
    PRODUCTS_MICROSERVICE_HOST: string,
    PRODUCTS_MICROSERVICE_PORT: number,
}

// Schema validation
const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

// Error and value
const {error, value} = envsSchema.validate(process.env);

if(error){
    throw new Error(`Env config validation error ${error?.message}`);
}

//Type value and return the env vars validated by Joi
const envVars: IEnvVars = value;

export const envs = {
    port: envVars?.PORT,
    productsHost: envVars?.PRODUCTS_MICROSERVICE_HOST,
    productsPort: envVars?.PRODUCTS_MICROSERVICE_PORT,
}
