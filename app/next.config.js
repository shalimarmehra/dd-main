// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/adminDashboard',
          destination: '/dashboard',
          permanent: true,
          has: [
            {
              type: 'cookie',
              key: 'role',
              value: 'user',
            },
          ],
        },
        {
          source: '/dashboard',
          destination: '/adminDashboard',
          permanent: true,
          has: [
            {
              type: 'cookie',
              key: 'role',
              value: 'admin',
            },
          ],
        },
      ];
    },
  };
  