const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOST || "localhost",
    },
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_DATABASE,
    },
    emailAuth: {
      // user: process.env.GMAIL_USER_NAME,
      // pass: process.env.GMAIL_USER_PASSWORD,
      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_USER_PASSWORD,
      api: process.env.SENDGRID_API_KEY,
    },
  },

  test: {
    server: {
      port: process.env.PORT || 3100,
      hostname: process.env.HOST || "localhost",
    },
    database: {
      url: process.env.DB_HOST,
    },
    emailAuth: {
      // user: process.env.GMAIL_USER_NAME,
      // pass: process.env.GMAIL_USER_PASSWORD,
      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_USER_PASSWORD,
      api: process.env.SENDGRID_API_KEY,
    },
  },

  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.HOST || "localhost",
    },
    database: {
      url: "mongodb://mongo:27017/express-production",
    },
    emailAuth: {
      // user: process.env.GMAIL_USER_NAME,
      // pass: process.env.GMAIL_USER_PASSWORD,

      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_USER_PASSWORD,
      api: process.env.SENDGRID_API_KEY,
    },
  },
};

config[env].isDev = env === "development";
config[env].isTest = env === "test";
config[env].isProd = env === "production";

module.exports = config[env];
