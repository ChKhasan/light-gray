import { assertRequiredEnvs } from '../utils/env'

export default defineNitroPlugin(() => {
    assertRequiredEnvs()
})

