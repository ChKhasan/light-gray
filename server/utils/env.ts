const REQUIRED_ENV_KEYS = [
    'MONGO_URI',
    'JWT_SECRET',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
] as const

type RequiredEnvKey = typeof REQUIRED_ENV_KEYS[number]

export const getRequiredEnv = (key: RequiredEnvKey): string => {
    const value = process.env[key]

    if (!value || !value.trim()) {
        throw new Error(`Missing required environment variable: ${key}`)
    }

    return value
}

export const assertRequiredEnvs = (): void => {
    for (const key of REQUIRED_ENV_KEYS) {
        getRequiredEnv(key)
    }
}

