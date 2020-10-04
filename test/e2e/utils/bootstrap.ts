import { Application } from 'express'
import * as http from 'http'
import { bootstrapMicroframework } from 'microframework-w3tec'
import { Connection } from 'typeorm/connection/Connection'

import { expressLoader } from '../../../src/loaders/expressLoader'
import { iocLoader } from '../../../src/loaders/iocLoader'
import { winstonLoader } from '../../../src/loaders/winstonLoader'
import { typeormLoader } from '../utils/typeormLoader'

export interface BootstrapSettings {
  app: Application
  server: http.Server
  connection: Connection
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
  const framework = await bootstrapMicroframework({
    loaders: [winstonLoader, iocLoader, typeormLoader, expressLoader]
  })
  return {
    app: framework.settings.getData('express_app') as Application,
    server: framework.settings.getData('express_server') as http.Server,
    connection: framework.settings.getData('connection') as Connection
  } as BootstrapSettings
}
