require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const { buildAPIResponse } = require("./utils");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const handler = (event, context) => {
  return buildAPIResponse(event, 200);
};

exports.handler = handler;
