@echo off
echo ============================================
echo   AI Travel Planner - Setup Script
echo ============================================
echo.

echo [1/4] Installing backend dependencies...
cd /d "%~dp0server"
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend install failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed.
echo.

echo [2/4] Installing frontend dependencies...
cd /d "%~dp0client"
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend install failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed.
echo.

echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next steps:
echo   1. Edit server\.env with your API keys
echo   2. Terminal 1: cd server ^& npm run dev
echo   3. Terminal 2: cd client ^& npm run dev
echo   4. Open http://localhost:5173
echo.
pause
