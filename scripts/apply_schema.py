#!/usr/bin/env python3
"""
Apply Supabase schema to database using direct PostgreSQL connection
"""

import os
import sys
from pathlib import Path

try:
    import psycopg2
    from dotenv import load_dotenv
except ImportError as e:
    print(f"Missing required package: {e}")
    sys.exit(1)

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
DB_PASSWORD = os.getenv('SUPABASE_DB_PASSWORD')

if not SUPABASE_URL:
    print("ERROR: NEXT_PUBLIC_SUPABASE_URL must be set")
    sys.exit(1)

# Extract project ID from URL
project_id = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '')
db_host = f"db.{project_id}.supabase.co"
db_name = "postgres"
db_user = "postgres"

if not DB_PASSWORD:
    print("ERROR: SUPABASE_DB_PASSWORD must be set")
    print("Get your database password from Supabase Dashboard -> Project Settings -> Database")
    sys.exit(1)

# Read schema file
schema_path = Path(__file__).parent.parent / 'supabase' / 'schema.sql'
if not schema_path.exists():
    print(f"ERROR: Schema file not found: {schema_path}")
    sys.exit(1)

with open(schema_path, 'r') as f:
    schema_sql = f.read()

print("Applying schema to Supabase...")
print(f"Database: {db_host}")
print(f"Schema file: {schema_path}")
print(f"Schema length: {len(schema_sql)} characters")

# Connect to database
try:
    conn = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=DB_PASSWORD,
        sslmode='require'
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("Connected to database")
    
    # Execute schema
    cursor.execute(schema_sql)
    
    print("Schema applied successfully!")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error applying schema: {e}")
    sys.exit(1)
