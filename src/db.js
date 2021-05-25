const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTYwNjE4MCwiZXhwIjoxOTM3MTgyMTgwfQ.c8zj6DKyaxTKGJiff9kEAd23b-JSCReK3sWkIj2ouTw";
const SUPABASE_URL = "https://xiacruyjnjhquwxtcang.supabase.co";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);
