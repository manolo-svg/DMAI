# DMAI - Guía de Inicio Rápido

## ⚡ En 5 Minutos

### 1️⃣ Obtén tu clave de API
Ve a [console.anthropic.com](https://console.anthropic.com) y copia tu clave de API.

### 2️⃣ Configura la carpeta
```bash
# En la carpeta DMAI
cp .env.example .env
# Abre .env y pega tu clave:
# ANTHROPIC_API_KEY=sk-ant-xxxxxxx
```

### 3️⃣ Instala todo
```bash
npm install
cd client && npm install && cd ..
```

### 4️⃣ Inicia la aplicación
**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run client
```

### 5️⃣ ¡Juega!
Abre `http://localhost:5173` en tu navegador.

---

## 🎮 Primera Sesión

1. Pulsa **"Nueva Campaña"**
2. Escribe un nombre épico
3. Crea personajes (mín. 3, máx. 6)
   - Nombre, raza, clase, nivel 4
   - Habilidades (STR, DEX, CON, INT, WIS, CHA)
   - HP y AC
4. Pulsa **"Crear Campaña"**
5. Pulsa **"Comenzar Aventura"**
6. ¡Empezad a jugar!

---

## ❓ ¿Problemas?

**"Error: Cannot find module"**
```bash
npm install
cd client && npm install && cd ..
```

**"Error: ANTHROPIC_API_KEY is not set"**
- Verifica que `.env` existe en la carpeta raíz
- Comprueba que pusiste la clave correctamente

**"Cannot connect to server"**
- Asegúrate de que Terminal 1 está ejecutando: `npm run dev`
- Asegúrate de que Terminal 2 está ejecutando: `npm run client`

**"Port 5173 already in use"**
```bash
# Mata el proceso anterior:
lsof -ti:5173 | xargs kill -9
```

---

## 📚 Más Ayuda

Consulta `README.md` para documentación completa.

¡Que empiece la aventura! 🐉⚔️
