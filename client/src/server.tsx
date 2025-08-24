import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest,
} from '@tanstack/react-start/server'

import { paraglideMiddleware } from './lib/paraglide/server.js'
import { overwriteGetLocale } from './lib/paraglide/runtime.js'
import { createRouter } from './router'

export default createStartHandler({
  createRouter,
})((event) =>
  paraglideMiddleware(getWebRequest(), ({ locale }) => {
    overwriteGetLocale(() => locale)
    return defaultStreamHandler(event)
  }),
)
