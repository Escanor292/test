#!/bin/bash
export PGPASSWORD=123
export PGUSER=postgres
export PGPORT=6090
export PGDATABASE=crowdfunding_local

echo "Dang khoi phuc database: $PGDATABASE tren port $PGPORT..."
psql -U $PGUSER -p $PGPORT -c "CREATE DATABASE $PGDATABASE;" 2>/dev/null
psql -U $PGUSER -p $PGPORT -d $PGDATABASE -f "$(dirname "$0")/seed.sql"

echo "Khoi phuc thanh cong! Chay 'npm run dev' de khoi dong."
