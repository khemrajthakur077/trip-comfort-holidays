import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcxwcbxsknxgknaiyfte.supabase.co'
const supabaseKey = 'sb_publishable_ZKxJZs8TX9n6O6K9GcGE1w_ZXqg8Ect'

export const supabase =
  globalThis.supabase ??
  createClient(supabaseUrl, supabaseKey)

if (import.meta.env.MODE !== 'production') {
  globalThis.supabase = supabase
}