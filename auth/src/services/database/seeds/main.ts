import { getPgClient } from '../db';

// TODO this whole folder should not go to docker - add to docker ignore

const { query } = getPgClient();
