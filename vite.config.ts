import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 5164,
      strictPort: true, // 5164가 점유 중이면 다른 포트로 넘어가지 않고 에러 출력
    },
  };
});
