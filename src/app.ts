import 'reflect-metadata'

import { bootstrapMicroframework } from 'microframework-w3tec'

import { banner } from './lib/banner'
import { Logger } from './lib/logger'
import { expressLoader } from './loaders/expressLoader'
import { iocLoader } from './loaders/iocLoader'
import { swaggerLoader } from './loaders/swaggerLoader'
import { typeormLoader } from './loaders/typeormLoader'
import { winstonLoader } from './loaders/winstonLoader'

const log = new Logger(__filename)

bootstrapMicroframework({
  loaders: [
    winstonLoader,
    iocLoader,
    typeormLoader,
    expressLoader,
    swaggerLoader
  ]
})
  .then(() => banner(log))
  .catch((error) => log.error('Application is crashed: ' + error))
