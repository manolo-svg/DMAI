# 🚀 INSTALACIÓN AUTOMÁTICA - LO MÁS FÁCIL

Ya no tienes que hacer nada manualmente. **Un solo archivo hace TODO.**

---

## 📋 Lo que TIENES que tener

1. **Node.js ZIP** descargado y descomprimido en `C:\nodejs`
   - Descargarlo de: https://nodejs.org (LTS, Windows x64 .zip)
   - Descomprimir en: `C:\nodejs`

2. **Tu clave de API de Anthropic**
   - Obtenerla en: https://console.anthropic.com
   - Algo como: `sk-ant-xxxxxxxxxxxxx`

---

## ✅ PASOS PARA INSTALAR

### PASO 1: Descarga la carpeta DMAI

1. Ve a: https://github.com/manolo-svg/DMAI
2. Pulsa **"Code"** → **"Download ZIP"**
3. Descomprime en: **`C:\DMAI`**

### PASO 2: Ejecuta el instalador

1. Abre la carpeta `C:\DMAI`
2. Busca el archivo: **`SETUP.bat`**
3. **DOBLE CLICK en SETUP.bat**

Una ventana negra se abrirá. El instalador:
- Verifica Node.js ✅
- Te pide tu clave de API
- Instala todo automáticamente (espera 5-10 minutos)
- Crea archivos para iniciar la app

### PASO 3: ¡A JUGAR!

Cuando termine SETUP.bat, tienes dos opciones:

**OPCIÓN A (Recomendado - Click-Click):**
- En carpeta DMAI, **DOBLE CLICK en**: `start-backend.bat`
- En carpeta DMAI, **DOBLE CLICK en**: `start-frontend.bat`
- Abre navegador: `http://localhost:5173`

**OPCIÓN B (Si prefieres terminal):**
- Terminal 1: `npm run dev`
- Terminal 2: `npm run client`
- Abre navegador: `http://localhost:5173`

---

## ❓ Preguntas Comunes

**¿Qué hace SETUP.bat?**
- Verifica que Node.js esté instalado
- Te pide tu clave de API
- Instala todas las librerías
- Crea scripts para iniciar fácilmente

**¿Qué hace start-backend.bat?**
- Inicia el servidor (puerto 3000)
- Mantiene una ventana abierta

**¿Qué hace start-frontend.bat?**
- Inicia la interfaz web (puerto 5173)
- Mantiene una ventana abierta

**¿Puedo cerrar las ventanas?**
- SÍ, cuando quieras. Pero ambas deben estar abiertas para que funcione.

**¿Cómo paro todo?**
- Cierra ambas ventanas
- O pulsa Ctrl+C en cada una

---

## 🆘 Si algo falla

### SETUP.bat dice "Node.js NO está instalado"
1. Descarga Node.js ZIP de: https://nodejs.org
2. Descomprime en: `C:\nodejs`
3. Reinicia SETUP.bat

### SETUP.bat pide la clave de API
- Obtenerla de: https://console.anthropic.com
- Debe empezar con: `sk-ant-`

### start-backend.bat se cierra inmediatamente
- PowerShell/Node.js tiene problemas
- Abre PowerShell manualmente
- Ve a `C:\DMAI`
- Escribe: `npm run dev`

---

## 📊 Estructura de archivos

```
C:\DMAI\
├── SETUP.bat                 ← EJECUTA ESTO PRIMERO
├── start-backend.bat         ← Para iniciar servidor
├── start-frontend.bat        ← Para iniciar interfaz
├── .env                      ← Tu clave de API (creado automáticamente)
├── server/
├── client/
└── node_modules/ (creado después de SETUP.bat)
```

---

## ✨ Ventajas de esta instalación automática

✅ Un solo archivo (`SETUP.bat`)  
✅ Sin complicaciones de PowerShell  
✅ Autodetecta Node.js  
✅ Crea scripts para iniciar fácilmente  
✅ Todo se guarda automáticamente  

---

**¿Listo?** Ejecuta `SETUP.bat` y ¡a jugar! 🐉⚔️
