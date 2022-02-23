import env from 'env-var';

// TODO do possibly install env var if needed later
// export const PORT = process.env.PORT || 3000;

export const PORT = env.get('PORT').default(3000).asPortNumber();
export const ENVIRONMENT = env.get('NODE_ENV').required().asString();
