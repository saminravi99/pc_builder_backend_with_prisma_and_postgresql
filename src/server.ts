/* eslint-disable no-console */
import { Server } from 'http'
import fs from 'fs'
import https from 'https'
import path from 'path'
import app from './app'
import config from './config/index'

// ... Your other Express middleware and route setups ...

// Load SSL certificate and private key
const privateKey = fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'))
const certificate = fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))

const serverOptions = {
  key: privateKey,
  cert: certificate,
}

// Create HTTPS server
const server: Server = https.createServer(serverOptions, app)

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

// let server: Server;

async function bootstrap() {
  try {
    server.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  if (server) {
    server.close()
  }
})
