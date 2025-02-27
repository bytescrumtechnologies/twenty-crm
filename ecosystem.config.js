module.exports = {
    apps: [
      {
        name: "twenty-worker",
        script: "npx",
        args: "nx worker twenty-server",
      },
      {
        name: "twenty-server",
        script: "npx",
        args: "nx start twenty-server",
      },
    ],
};
  