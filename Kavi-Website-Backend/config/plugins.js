module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'strapi-provider-upload-azure-storage',
        providerOptions: {
          account: env('STORAGE_ACCOUNT'),
          accountKey: env('STORAGE_ACCOUNT_KEY'),
          serviceBaseURL: env('STORAGE_URL'),
          containerName: env('STORAGE_CONTAINER_NAME'),
          cdnBaseURL: env('STORAGE_CDN_URL'),
          defaultPath: 'assets',
          maxConcurrent: 10
        }
      }
    },
    'import-export-entries': {
    enabled: true
    },
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
    seo: {
      enabled: true,
    }
  });