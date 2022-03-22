const authConfig = {
  jwt: {
    expiresIn: '30d',
    secret: `${process.env.SECRET}`,
  },
  config_path: `${__dirname}`,
};

export { authConfig };
