// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yqikqohmkcznilocclgc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxaWtxb2hta2N6bmlsb2NjbGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDQ1ODMsImV4cCI6MjA2MDk4MDU4M30.lwyxVuQsSq_XtmVQa_lBAasabfh-wL-kC_NRtqjl5sQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);