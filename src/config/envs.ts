import 'dotenv/config'
import * as joi from 'joi'


//Defines the interface of the envs
interface IEnvVars {
    PORT: number,
    NATS_SERVERS: string[],
}

// Schema validation
const envsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
})
    .unknown(true); 

// Error and value
const { error, value } = envsSchema.validate({ ...process.env, NATS_SERVERS: process.env.NATS_SERVERS?.split(',') });

if (error) {
    throw new Error(`Env config validation error ${error?.message}`);
}

//Type value and return the env vars validated by Joi
const envVars: IEnvVars = value;

export const envs = {
    port: envVars?.PORT,
    natsServers: envVars?.NATS_SERVERS
}

