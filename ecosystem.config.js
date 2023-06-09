module.exports = {
  apps: [
    {
      name: 'app_nuxt_front_end',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'dev'
    }
  ]
}
