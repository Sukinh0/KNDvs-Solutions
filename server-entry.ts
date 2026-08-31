import handler from 'vinext/server/fetch-handler';

const customWorker = {
  async fetch(request: Request, env: Record<string, unknown>, ctx: unknown) {
    if (env && typeof env === 'object') {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === 'string') {
          process.env[key] = value;
        }
      }
      (globalThis as unknown as Record<string, unknown>).__cf_env__ = env;
    }
    return (handler as { fetch: (req: Request, env: unknown, ctx: unknown) => Promise<Response> }).fetch(
      request,
      env,
      ctx
    );
  },
};

export default customWorker;
