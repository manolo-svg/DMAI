# 🐳 DMAI con Docker - Guía Rápida

Con Docker, **no necesitas instalar Node.js**. Todo funciona en contenedores.

---

## 📋 Requisitos

Solo necesitas:
- **Docker Desktop** (descárgalo de https://www.docker.com/products/docker-desktop)

Eso es todo. Docker incluye todo lo demás automáticamente.

---

## 🚀 Instalación (Muy fácil)

### PASO 1: Descargar Docker Desktop

1. Ve a https://www.docker.com/products/docker-desktop
2. Descarga la versión para tu sistema:
   - **Windows**: Docker Desktop for Windows
   - **Mac**: Docker Desktop for Mac
   - **Linux**: Docker Engine
3. Instálalo normal (siguiente, siguiente, instalar)
4. **Reinicia el ordenador**

### PASO 2: Verificar que Docker está instalado

Abre PowerShell o Terminal y escribe:
```bash
docker --version
```

Debería mostrar algo como: `Docker version 24.0.0` ✅

### PASO 3: Descargar DMAI

1. Ve a https://github.com/manolo-svg/DMAI
2. Pulsa **"Code"** → **"Download ZIP"**
3. Descomprime el ZIP

### PASO 4: Crear el archivo `.env`

En la carpeta DMAI, crea un archivo `.env` con tu clave de API:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

(Reemplaza con tu clave real de Anthropic)

### PASO 5: Ejecutar Docker (¡UN SOLO COMANDO!)

1. Abre PowerShell o Terminal
2. Navega a la carpeta DMAI:
   ```bash
   cd C:\ruta\a\DMAI
   ```
3. Escribe **ESTE COMANDO**:
   ```bash
   docker-compose up
   ```

**Espera 1-2 minutos** mientras Docker descarga y configura todo.

Cuando veas algo como esto, ¡está listo!:
```
backend  | 🎲 DMAI Server running on http://localhost:3000
frontend | ➜  Local:   http://localhost:5173/
```

---

## 🎮 ¡A JUGAR!

1. Abre tu navegador
2. Ve a: `http://localhost:5173`
3. ¡Pulsa "Nueva Campaña" y empieza a jugar!

---

## 🛑 Detener Docker

Cuando termines:
- En la terminal, pulsa **Ctrl+C**
- Espera a que se cierre

O en Docker Desktop, pulsa stop en los contenedores.

---

## 🐛 Problemas Comunes

### Error: "docker: command not found"
→ Docker no está instalado. Descárgalo de https://www.docker.com

### Error: "Cannot connect to Docker daemon"
→ Docker Desktop no está ejecutándose. Abrelo.

### Error de puerto (3000 o 5173 en uso)
→ Algo está usando esos puertos. Intenta:
```bash
docker-compose down
docker-compose up
```

### Vuelve a empezar de 0
```bash
docker-compose down --volumes
docker-compose up
```

---

## 📊 ¿Qué hace Docker?

Docker crea dos **"máquinas virtuales ligeras"** (contenedores):

```
┌──────────────────────────────────────┐
│         Docker Desktop               │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────┐                  │
│  │ BACKEND        │                  │
│  │ (Servidor      │                  │
│  │  Node.js)      │ Puerto 3000      │
│  │                │                  │
│  └────────────────┘                  │
│                                      │
│  ┌────────────────┐                  │
│  │ FRONTEND       │                  │
│  │ (React Vite)   │ Puerto 5173      │
│  │                │                  │
│  └────────────────┘                  │
│                                      │
└──────────────────────────────────────┘
        Tu Navegador
        ↓
   localhost:5173
```

Cada contenedor tiene su propio Node.js y todo lo necesario. **No afecta a tu Windows.**

---

## ✅ Ventajas de Docker

✅ No instalas nada en Windows (limpio)  
✅ Todo funciona igual en cualquier ordenador  
✅ Un solo comando: `docker-compose up`  
✅ Sin problemas de "npm no se reconoce"  
✅ Fácil de parar y empezar  

---

## 💾 Datos Guardados

Tus campañas se guardan automáticamente en:
```
DMAI/server/data/campaigns/
```

Incluso si cierras Docker, los datos permanecen.

---

**¿Listo?** Ejecuta `docker-compose up` y ¡a jugar! 🐉⚔️
