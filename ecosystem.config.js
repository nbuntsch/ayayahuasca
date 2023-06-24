module.exports = {
  apps: [
    {
      name: 'ayayahuasca',
      script: 'npm',
      args: 'start',
      cwd: 'api',
      env: {
        PORT: 2222,
      },
    },
  ],
};
