interface SessionConfig {
  password: string;
  sslOnly: boolean;
}

export interface ConfigSchema {
  shared: {
    name: string;
    [k: string]: any;
  };
  app: {
    host: string;
    port: string | number;
    dir: string;
  };
}
