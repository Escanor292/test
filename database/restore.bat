@echo off
echo === Setup Local Database for crowdfunding-vn ===
echo.

REM Check if PostgreSQL is available
where psql >nul 2>&1
if errorlevel 1 (
  REM Try common PostgreSQL paths
  set PSQL="C:\Program Files\PostgreSQL\18\bin\psql.exe"
  if not exist %PSQL% set PSQL="C:\Program Files\PostgreSQL\17\bin\psql.exe"
  if not exist %PSQL% set PSQL="C:\Program Files\PostgreSQL\16\bin\psql.exe"
  if not exist %PSQL% set PSQL="C:\Program Files\PostgreSQL\15\bin\psql.exe"
) else (
  set PSQL=psql
)

set PGPASSWORD=123
set PGPORT=5432
set PGUSER=postgres
set DBNAME=crowdfunding_local

echo [1] Creating database: %DBNAME%
%PSQL% -U %PGUSER% -p %PGPORT% -c "DROP DATABASE IF EXISTS %DBNAME%;" postgres
%PSQL% -U %PGUSER% -p %PGPORT% -c "CREATE DATABASE %DBNAME%;" postgres

echo [2] Restoring data from seed.sql...
%PSQL% -U %PGUSER% -p %PGPORT% -d %DBNAME% -f "%~dp0seed.sql"

echo.
echo === Done! ===
echo Update your .env:
echo   DATABASE_URL="postgresql://postgres:123@localhost:5432/crowdfunding_local"
echo.
pause
