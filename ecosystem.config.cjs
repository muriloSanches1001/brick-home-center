module.exports = {
  apps: [
    {
      name: 'brick-home-center',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env_file: '.env',
    },
  ],
}
