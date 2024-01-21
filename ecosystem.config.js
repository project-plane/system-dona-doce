module.exports = {
  apps: [
    {
      name: 'app_nuxt_front_end',
      exec_mode: 'fork',
      instances: 'max', // Or a number of instances
      script: 'yarn start',
      args: 'start'
    }
  ]
}
