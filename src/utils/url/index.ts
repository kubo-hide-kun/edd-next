export const createDynamicUrl = (
  url: string,
  query?: { [key: string]: unknown }
): string => {
  const baseUrl = query
    ? Object.entries(query).reduce((prev, [key, value]) => {
        if (value === undefined || value === '') {
          return prev;
        }
        const next = prev.replace(`[${key}]`, String(value));
        return next;
      }, url)
    : url;

  const rest = query
    ? Object.entries(query).reduce((prev, [key, value]) => {
        const unused = String(url).indexOf(`[${key}]`) === -1;
        const notEmpty =
          ([undefined, ''] as unknown[]).includes(value) === false;
        return {
          ...prev,
          ...(unused && notEmpty && { [key]: String(value) }),
        };
      }, {} as Record<string, string>)
    : undefined;

  return rest && Object.keys(rest).length
    ? `${baseUrl}?${new URLSearchParams(rest).toString()}`
    : baseUrl;
};
