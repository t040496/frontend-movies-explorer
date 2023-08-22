export interface IRequestProps {
  baseUrl: string;
  config: RequestInit;
  body?: Record<string, unknown>;
}

export const request = ({ baseUrl, body, config }: IRequestProps) => {
  if (body && typeof body === "object") {
    config.body = JSON.stringify(body);
  }

  return fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    credentials: "include",
    ...config,
  })
    .then((res) => {
      const result = res.json();
      return res.ok ? result : result.then((e) => Promise.reject(e));
    })
    .catch((e) => {
      throw new Error(e.message || "Непредвиденная ошибка на сервере");
    });
};

export const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return process.env[key] || "";
};
