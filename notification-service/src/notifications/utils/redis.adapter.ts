import { ClientOpts, RedisClient } from 'redis';
import { promisify } from 'util';
export { RedisClient } from 'redis';

/** Redis instance */

export class Redis extends RedisClient {
  public get: any;
  public set: any;
  public del: any;

  constructor(opts: ClientOpts) {
    opts.retry_strategy = (opt) => Math.max(opt.attempt * 100, 3000);
    super(opts);

    this.get = promisify(this.get).bind(this);
    this.set = promisify(this.set).bind(this);
    this.del = promisify(this.del).bind(this);
  }
}
