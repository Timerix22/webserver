import * as http from 'http'
import { handleRequest } from './requests'
import { importConfig } from './config'

const config = importConfig()
const server = http.createServer(handleRequest)
server.listen(config.port, config.hostname, () => {
    console.log(`server running at http://${config.hostname}:${config.port}/`)
})
