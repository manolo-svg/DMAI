@echo off
chcp 65001 > nul
cls

echo.
echo ╔════════════════════════════════════════════╗
echo ║  🎲 DMAI - Configuración Automática        ║
echo ║  D&D Master AI                             ║
echo ╚════════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Node.js NO está instalado
    echo.
    echo Solución:
    echo 1. Descarga Node.js de: https://nodejs.org
    echo 2. Descarga la versión LTS (Windows x64 .zip)
    echo 3. Descomprime en C:\nodejs
    echo 4. Reinicia este script
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js encontrado

REM Crear .env si no existe
echo [2/5] Configurando archivo .env...
if exist .env (
    echo ✅ Archivo .env ya existe
) else (
    echo.
    echo Por favor, pega tu clave de API de Anthropic
    echo Obtenerla en: https://console.anthropic.com
    echo.
    set /p API_KEY="Clave (sk-ant-...): "

    if "!API_KEY!"=="" (
        echo ❌ ERROR: Clave vacía
        pause
        exit /b 1
    )

    echo ANTHROPIC_API_KEY=!API_KEY! > .env
    echo ✅ Archivo .env creado
)

REM Instalar servidor
echo [3/5] Instalando dependencias del servidor...
call npm install
if %errorlevel% neq 0 (
    echo ❌ ERROR instalando servidor
    pause
    exit /b 1
)
echo ✅ Servidor instalado

REM Instalar cliente
echo [4/5] Instalando dependencias del cliente...
cd client
call npm install
cd ..
if %errorlevel% neq 0 (
    echo ❌ ERROR instalando cliente
    pause
    exit /b 1
)
echo ✅ Cliente instalado

REM Crear scripts de inicio
echo [5/5] Creando scripts de inicio...

(
    echo @echo off
    echo cd /d "%%~dp0"
    echo npm run dev
    echo pause
) > start-backend.bat

(
    echo @echo off
    echo cd /d "%%~dp0"
    echo npm run client
    echo pause
) > start-frontend.bat

echo ✅ Scripts creados

REM Resumen final
echo.
echo ╔════════════════════════════════════════════╗
echo ║  ✅ ¡CONFIGURACIÓN COMPLETADA!             ║
echo ╚════════════════════════════════════════════╝
echo.
echo 🎮 Ahora puedes jugar de dos formas:
echo.
echo OPCIÓN A (MÁS FÁCIL - Click-Click):
echo   1. DOBLE CLICK en: start-backend.bat
echo   2. DOBLE CLICK en: start-frontend.bat
echo   3. Abre navegador: http://localhost:5173
echo.
echo OPCIÓN B (Terminal):
echo   1. Terminal 1: npm run dev
echo   2. Terminal 2: npm run client
echo   3. Abre navegador: http://localhost:5173
echo.
echo ¿Iniciar ahora? (s/n)
set /p START_NOW="Respuesta: "

if /i "%START_NOW%"=="s" (
    echo.
    echo Iniciando servidores...
    start start-backend.bat
    timeout /t 2 /nobreak
    start start-frontend.bat
    echo.
    echo ✅ Servidores iniciando...
    echo Abre navegador en: http://localhost:5173
) else (
    echo.
    echo De acuerdo. Cuando quieras jugar:
    echo   - Haz doble click en start-backend.bat
    echo   - Haz doble click en start-frontend.bat
)

echo.
echo 🐉 ¡Que disfrutes la aventura! ⚔️
echo.
pause
