interface AppConfig {
  apiUrl: string;
  appName: string;
  maxSwipeCards: number;
  environment: 'development' | 'production' | 'test';
}

const configData: AppConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  maxSwipeCards: Number(process.env.NEXT_PUBLIC_MAX_SWIPES),
  environment: (process.env.NODE_ENV as AppConfig['environment']) || 'development',
};

export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  const value = configData[key];

  if (value === undefined) {
    throw new Error(`[Config Error]: Key "${key}" is not defined in appConfig.`);
  }

  return value;
}