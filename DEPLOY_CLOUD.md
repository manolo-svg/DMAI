# 🚀 Desplegar DMAI en la Nube (5 minutos)

**¡NO NECESITAS DESCARGAR NADA!** Solo un navegador y este link.

---

## ✨ Lo que vas a conseguir

Un link único tipo: `https://dmai.vercel.app`

Todos los jugadores abren ese link en el navegador y ¡A JUGAR! 🎲

---

## 🔧 PASO 1: Desplegar Backend (Railway)

### 1.1 Ve a Railway
- Abre: https://railway.app
- Click en **"Dashboard"**
- Click en **"New Project"**
- Selecciona **"Deploy from GitHub"**

### 1.2 Conecta tu GitHub
- Selecciona el repositorio: `manolo-svg/DMAI`
- Click en **"Deploy"**

### 1.3 Configura Variables de Entorno
- En Railway, ve a tu proyecto DMAI
- Click en **"Variables"**
- Añade tu clave de API:
  ```
  ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
  ```
- Click en **"Save"**

### 1.4 Obtén la URL del backend
- En Railway, ve a **"Deployments"**
- Copia la URL (algo como: `https://dmai-production.up.railway.app`)
- **Guárdala, la necesitarás en el Paso 3**

**¡El backend está en la nube!** ✅

---

## 🌐 PASO 2: Desplegar Frontend (Vercel)

### 2.1 Ve a Vercel
- Abre: https://vercel.com
- Click en **"New Project"**
- Selecciona el repositorio: `manolo-svg/DMAI`

### 2.2 Configura el Proyecto
- **Project name**: `dmai` (o lo que quieras)
- **Framework**: Vite
- **Root directory**: `client`

### 2.3 Configura Variables de Entorno
Antes de desplegar, necesitas agregar:
- **Name**: `VITE_API_URL`
- **Value**: La URL que copiaste de Railway (Paso 1.4)
  - Ejemplo: `https://dmai-production.up.railway.app`

### 2.4 Deploy
- Click en **"Deploy"**
- Espera 2-3 minutos

**¡Tu app está en vivo!** ✅

Verás una URL como: `https://dmai.vercel.app`

---

## 🎮 PASO 3: ¡A JUGAR!

1. Todos abren en el navegador: `https://dmai.vercel.app`
2. ¡Crean una campaña!
3. ¡A jugar!

---

## 📋 Checklist

- [ ] Cuenta en Railway creada
- [ ] Repositorio conectado a Railway
- [ ] Variable ANTHROPIC_API_KEY configurada en Railway
- [ ] URL de Railway copiada
- [ ] Proyecto creado en Vercel
- [ ] Variable VITE_API_URL configurada en Vercel
- [ ] Frontend desplegado
- [ ] Abres el link en navegador
- [ ] ¡JUGANDO! 🎲

---

## 🆘 Problemas

### "Error en Railway"
- Verifica que ANTHROPIC_API_KEY está bien configurada
- Reinicia el deployment

### "Blank page en Vercel"
- Verifica que VITE_API_URL apunta a Railway
- Limpia caché del navegador (Ctrl+Shift+Delete)

### "Conexión rechazada"
- Espera 5 minutos, a veces Railway tarda

---

## 💾 Las partidas se guardan

- En Railway, en carpeta `/data`
- Se guardan automáticamente
- Persisten entre sesiones

---

## ✅ Listo

**Todos abren el link Vercel → ¡A JUGAR!** 🐉⚔️

No necesitan nada más. Ni Node.js, ni npm, nada. Solo el navegador.
