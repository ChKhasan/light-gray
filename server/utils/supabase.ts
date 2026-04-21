import { createClient } from '@supabase/supabase-js'
import { getRequiredEnv } from './env'

export const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
)
