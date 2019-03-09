const { PORT, NODE_ENV } = process.env;

const log = {
  enabled: !!process.env.NOLOG
}

let config = {
  port: PORT || 3000,
  env: NODE_ENV === 'local' ? 'development' : 'production',
}

export default config;