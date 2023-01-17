import { Client } from '../interfaces';

export type RequestWithUser = Request & { user: Client };
