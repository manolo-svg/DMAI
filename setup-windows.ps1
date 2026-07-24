# DMAI - Configuración Automática para Windows
# Ejecuta este script y configura TODO automáticamente

Write-Host "🎲 DMAI - Configuración Automática" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Función para esperar
function Wait-For-Continue {
    Write-Host ""
    Write-Host "Pulsa ENTER para continuar..." -ForegroundColor Yellow
    Read-Host
}

# PASO 1: Verificar Node.js
Write-Host "PASO 1: Verificando Node.js..." -ForegroundColor Green

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js ya está instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js NO está instalado o no se encuentra en el PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, descarga Node.js de: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "1. Descarga el LTS (Windows x64 .zip)" -ForegroundColor Yellow
    Write-Host "2. Descomprime en C:\nodejs" -ForegroundColor Yellow
    Write-Host "3. Ejecuta este script de nuevo" -ForegroundColor Yellow
    exit
}

# PASO 2: Crear archivo .env
Write-Host ""
Write-Host "PASO 2: Configurando archivo .env..." -ForegroundColor Green

$envPath = "$PSScriptRoot\.env"

if (Test-Path $envPath) {
    Write-Host "✅ Archivo .env ya existe" -ForegroundColor Green
} else {
    Write-Host "Necesito tu clave de API de Anthropic" -ForegroundColor Yellow
    Write-Host "Obtenerla en: https://console.anthropic.com" -ForegroundColor Yellow
    Write-Host ""
    $apiKey = Read-Host "Pega tu clave (sk-ant-...)"

    if ($apiKey -match "sk-ant") {
        $envContent = "ANTHROPIC_API_KEY=$apiKey"
        Set-Content -Path $envPath -Value $envContent -Encoding UTF8
        Write-Host "✅ Archivo .env creado correctamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Clave inválida. Debe empezar con 'sk-ant-'" -ForegroundColor Red
        exit
    }
}

# PASO 3: Instalar dependencias del servidor
Write-Host ""
Write-Host "PASO 3: Instalando dependencias del servidor..." -ForegroundColor Green
Write-Host "(Esto puede tardar 2-3 minutos)" -ForegroundColor Yellow

try {
    npm install
    Write-Host "✅ Dependencias del servidor instaladas" -ForegroundColor Green
} catch {
    Write-Host "❌ Error instalando dependencias del servidor" -ForegroundColor Red
    exit
}

# PASO 4: Instalar dependencias del cliente
Write-Host ""
Write-Host "PASO 4: Instalando dependencias del cliente..." -ForegroundColor Green
Write-Host "(Esto puede tardar 2-3 minutos)" -ForegroundColor Yellow

try {
    Set-Location client
    npm install
    Set-Location ..
    Write-Host "✅ Dependencias del cliente instaladas" -ForegroundColor Green
} catch {
    Write-Host "❌ Error instalando dependencias del cliente" -ForegroundColor Red
    exit
}

# PASO 5: Crear atajos para iniciar
Write-Host ""
Write-Host "PASO 5: Creando scripts de inicio..." -ForegroundColor Green

$startBackend = @"
@echo off
cd /d "%~dp0"
npm run dev
pause
"@

$startFrontend = @"
@echo off
cd /d "%~dp0"
npm run client
pause
"@

Set-Content -Path "$PSScriptRoot\start-backend.bat" -Value $startBackend
Set-Content -Path "$PSScriptRoot\start-frontend.bat" -Value $startFrontend

Write-Host "✅ Scripts creados: start-backend.bat y start-frontend.bat" -ForegroundColor Green

# RESUMEN FINAL
Write-Host ""
Write-Host "════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ ¡CONFIGURACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ahora tienes DOS opciones para jugar:" -ForegroundColor Yellow
Write-Host ""
Write-Host "OPCIÓN A (FÁCIL - Recomendado):" -ForegroundColor Green
Write-Host "  1. En la carpeta DMAI, haz DOBLE CLICK en: start-backend.bat" -ForegroundColor White
Write-Host "  2. En OTRA ventana, DOBLE CLICK en: start-frontend.bat" -ForegroundColor White
Write-Host "  3. Abre navegador en: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "OPCIÓN B (Desde PowerShell):" -ForegroundColor Green
Write-Host "  Terminal 1: npm run dev" -ForegroundColor White
Write-Host "  Terminal 2: npm run client" -ForegroundColor White
Write-Host ""
Write-Host "════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "¿Quieres iniciar AHORA? (s/n)" -ForegroundColor Yellow
$start = Read-Host

if ($start -eq "s") {
    Write-Host ""
    Write-Host "Iniciando backend en 3 segundos..." -ForegroundColor Green
    Start-Sleep -Seconds 3
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c start-backend.bat"
    Start-Sleep -Seconds 2
    Write-Host "Iniciando frontend en 3 segundos..." -ForegroundColor Green
    Start-Sleep -Seconds 3
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c start-frontend.bat"
    Write-Host ""
    Write-Host "✅ Servidores iniciando..." -ForegroundColor Green
    Write-Host "Abre navegador en: http://localhost:5173" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "De acuerdo. Cuando quieras jugar, ejecuta:" -ForegroundColor Yellow
    Write-Host "  - start-backend.bat" -ForegroundColor White
    Write-Host "  - start-frontend.bat" -ForegroundColor White
}

Write-Host ""
Write-Host "¡Que disfrutes la aventura! 🐉⚔️" -ForegroundColor Cyan
