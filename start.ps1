# CabNest AI - PowerShell Start Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CabNest AI - Quick Start Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Maven is installed
$mavenInstalled = Get-Command mvn -ErrorAction SilentlyContinue
if (-not $mavenInstalled) {
    Write-Host "[ERROR] Maven is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Maven from: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installation, add Maven's bin folder to your PATH" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Maven is installed" -ForegroundColor Green

# Check Java
$javaInstalled = Get-Command java -ErrorAction SilentlyContinue
if (-not $javaInstalled) {
    Write-Host "[ERROR] Java is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Java is installed" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start backend in a new PowerShell window
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Starting Spring Boot Backend...' -ForegroundColor Green; mvn spring-boot:run"

Write-Host "Backend starting in new window..." -ForegroundColor Yellow
Write-Host "Waiting 10 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host 'Starting Next.js Frontend...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CabNest AI is starting!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Two new windows have been opened:" -ForegroundColor Yellow
Write-Host "  1. Backend (Spring Boot)" -ForegroundColor Yellow
Write-Host "  2. Frontend (Next.js)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Wait a few moments for both servers to start," -ForegroundColor Cyan
Write-Host "then open http://localhost:3000 in your browser." -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit this window"
