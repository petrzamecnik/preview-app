import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'preview-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    "CapOcr": {}
  }
};

export default config;
