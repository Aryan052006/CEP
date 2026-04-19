# ──────────────────────────────────────────────
# Saheli - Start All Services
# Run from the project root: .\start_all.ps1
# ──────────────────────────────────────────────

Write-Host ""
Write-Host "=======================================" -ForegroundColor Magenta
Write-Host "   🌸 Saheli - Starting All Services   " -ForegroundColor Magenta
Write-Host "=======================================" -ForegroundColor Magenta
Write-Host ""

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

# ─── 1. ML Service (FastAPI on port 8000) ─────
Write-Host "[1/3] Starting ML Service (FastAPI :8000)..." -ForegroundColor Cyan
$mlJob = Start-Job -ScriptBlock {
    Set-Location "$using:root\ml-service"
    python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
}

Start-Sleep -Seconds 2

# ─── 2. Backend (Node.js on port 5000) ────────
Write-Host "[2/3] Starting Backend (Express :5000)..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location "$using:root\backend"
    node index.js
}

Start-Sleep -Seconds 2

# ─── 3. Frontend (Next.js on port 3000) ───────
Write-Host "[3/3] Starting Frontend (Next.js :3000)..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "$using:root\my-app"
    npm run dev
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Magenta
Write-Host "   All services starting up!           " -ForegroundColor White
Write-Host "   Frontend:   http://localhost:3000   " -ForegroundColor Green
Write-Host "   Backend:    http://localhost:5000   " -ForegroundColor Yellow
Write-Host "   ML Service: http://localhost:8000   " -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press Ctrl+C to stop all services." -ForegroundColor Gray
Write-Host ""

# Keep alive and show logs
try {
    while ($true) {
        # Stream logs from all jobs
        Receive-Job -Job $mlJob -ErrorAction SilentlyContinue
        Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
        Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
} finally {
    Write-Host "`nStopping all services..." -ForegroundColor Red
    Stop-Job -Job $mlJob, $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $mlJob, $backendJob, $frontendJob -Force -ErrorAction SilentlyContinue
    Write-Host "All services stopped." -ForegroundColor Red
}
