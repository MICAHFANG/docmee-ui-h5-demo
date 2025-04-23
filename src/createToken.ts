export const createToken = async (options: { ApiKey: string; limit?: number; uid?: string }) => {
  const {
    ApiKey,
    limit = 1,
    // TODO: Just for demo, you should use your own uid to create token.
    uid = new Date().getTime() + "",
  } = options;

  const res = await fetch("https:/docmee.cn/api/user/createApiToken", {
    method: "POST",
    body: JSON.stringify({ uid, limit }),
    headers: { "Api-Key": ApiKey, "Content-Type": "application/json" },
  });

  const json = (await res.json()).data as { /* token */ token: string; /* token expire time */ expireTime: number };
  return json;
};
