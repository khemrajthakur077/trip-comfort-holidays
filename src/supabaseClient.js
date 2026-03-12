import { createClient } from '@supabase/supabase-js'

// Variables ko direct string mein daal dete hain
const supabaseUrl = 'https://gcxwcbxsknxgknaiyfte.supabase.co'
const supabaseKey = 'sb_publishable_ZKxJZs8TX9n6O6K9GcGE1w_ZXqg8Ect'

export const supabase = createClient(supabaseUrl, supabaseKey)