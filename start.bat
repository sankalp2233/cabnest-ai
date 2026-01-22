@echo off
echo ========================================
echo CabNest AI - Quick Start Script
echo ========================================
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Maven is not installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
    echo.
    echo After installation, add Maven's bin folder to your PATH
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

REM Check if MySQL is running
echo Checking MySQL connection...
mysql -u root -proot -e "SELECT 1;" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Cannot connect to MySQL
    echo Please ensure:
    echo   1. MySQL Server is installed
    echo   2. MySQL service is running
    echo   3. Root password is 'root' (or update application.properties)
    echo.
    echo Press any key to continue anyway, or Ctrl+C to exit
    pause >nul
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo.

REM Start backend in a new window
start "CabNest Backend" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo Starting Frontend Server...
echo ========================================
echo.

REM Start frontend in a new window
start "CabNest Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo CabNest AI is starting!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Two new windows have been opened:
echo   1. Backend (Spring Boot)
echo   2. Frontend (Next.js)
echo.
echo Wait a few moments for both servers to start,
echo then open http://localhost:3000 in your browser.
echo.
echo Press any key to exit this window...
pause >nul
