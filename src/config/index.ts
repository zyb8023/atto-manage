import { cwd, env } from 'process';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';
import type { Config } from 'src/typings/config';

export type T_RUNNING_ENV = 'dev' | 'prod';
// 获取项目运行环境
export const getEnv = (): T_RUNNING_ENV => {
  return (env as Record<string, any>).RUNNING_ENV;
};

export const IS_DEV: boolean = getEnv() === 'dev';

export function getConfig(): Config.IAppConfig {
  const environment = getEnv();
  const yamlPath = path.join(cwd(), `./application.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf-8');
  return parse(file) as Config.IAppConfig;
}

export { developLog as logConfig } from './logger';
