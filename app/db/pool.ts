import { Pool } from "pg";

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  throw new Error(
    "SUPABASE_DB_URL is not set. Please add your database URL to the environment."
  );
}

const schema = process.env.SUPABASE_SCHEMA || "public";

const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
});

// Ensure we operate within the configured schema
pool.on("connect", (client) => {
  client.query(`SET search_path TO ${schema}, public`);
});

export default pool;
