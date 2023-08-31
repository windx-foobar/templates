import type { Options as NodemailerOptions } from 'nodemailer/lib/smtp-transport';
import type { Credentials as NodemailerAuthOptions } from 'nodemailer/lib/smtp-connection';

interface NodemailerConfig extends Pick<NodemailerOptions, 'host' | 'port'> {
  enable: boolean;
  auth?: NodemailerAuthOptions;
  defaultFrom?: string;
}

interface SessionConfig {
  password: string;
  sslOnly: boolean;
}

export interface ConfigSchema {
  shared: {
    nodemailer: NodemailerConfig;
    name: string;
    [k: string]: any;
  };
  crm: {
    host: string;
    port: string | number;
    dir: string;
    sessions: {
      public: SessionConfig;
    };
  };
  lk: {
    host: string;
    port: string | number;
    dir: string;
  };
}
