type CmsResponseLike = {
  data?: unknown;
  description?: unknown;
};

const tryParseJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const extractCmsDescription = (payload: unknown): string => {
  if (!payload) {
    return "";
  }

  if (typeof payload === "string") {
    const trimmedPayload = payload.trim();

    if (trimmedPayload.startsWith("{") || trimmedPayload.startsWith("[")) {
      return extractCmsDescription(tryParseJson(trimmedPayload));
    }

    return trimmedPayload;
  }

  if (typeof payload === "object") {
    const record = payload as CmsResponseLike;

    if (typeof record.description === "string") {
      return extractCmsDescription(record.description);
    }

    if (record.data) {
      return extractCmsDescription(record.data);
    }
  }

  return "";
};
