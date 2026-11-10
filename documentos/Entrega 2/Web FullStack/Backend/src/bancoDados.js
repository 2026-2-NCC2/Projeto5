import pkg from 'pg';
const { Pool } = pkg;

import 'dotenv/config';

// Criando o pool de conexões utilizando a string segura do Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max:10,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões seguras externas com o Supabase
  }
});

export default pool;