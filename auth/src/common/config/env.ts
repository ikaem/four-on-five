// TODO do possibly install env var if needed later

import { ExecutionEnv } from '../../services/database/config/database.config';

// export const PORT = process.env.PORT || 3000;
export const PORT = 3000;
export const NODE_ENV = (process.env.NODE_ENV || 'development') as ExecutionEnv;
