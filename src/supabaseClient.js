import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmand2bXB4c3JndGJlZ2luY21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5NzYyOTEsImV4cCI6MTk4MDU1MjI5MX0.0iVwj4aopdacH_5BV_dtrkLb1NUta9fZKb4WoKjGTdo'
const SUPABASE_URL = "https://ffjwvmpxsrgtbegincmd.supabase.co"

export const supabase = createClient(SUPABASE_URL,  SUPABASE_KEY)