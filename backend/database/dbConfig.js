// Credit: https://medium.com/swlh/node-js-how-to-access-mysql-remotely-using-ssh-d45e21221039

// define connection config for the database

const dbServer = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
// define connection config for the ssh tunnel
const tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: 22,
  username: process.env.DB_SSH_USER,
  privateKey: process.env.DB_SSH_PRIVKEY,
};

const forwardConfig = {
  srcHost: "127.0.0.1", // any valid address
  srcPort: 3306, // any valid port
  dstHost: dbServer.host, // destination database
  dstPort: dbServer.port, // destination port
};

const mysql = require("mysql2");
const { Client } = require("ssh2");
// create an instance of SSH Client
const sshClient = new Client();

const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) reject(err);

          // create a new DB server object including stream
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          // connect to mysql
          const connection = mysql.createConnection(updatedDbServer);
          // check for successful connection
          // resolve or reject the Promise accordingly
          connection.connect((error) => {
            if (error) {
              reject(error);
            }
            resolve(connection);
          });
        }
      );
    })
    .connect(tunnelConfig);
  sshClient.on("error", () => {
    reject("SSH Error");
  });
});

module.exports = SSHConnection;
