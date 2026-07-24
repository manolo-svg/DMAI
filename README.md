# DMAI - D&D Master AI

Una aplicación local que actúa como Dungeon Master de IA para D&D 5ª edición. ¡Juega sin necesidad de que nadie sea el DM!

## 🎲 Características

✅ **Narrativa generada por IA**: Claude genera historias épicas y coherentes  
✅ **Gestión de personajes**: Crea o importa fichas de personaje (nivel 4)  
✅ **Sistema de combate**: Iniciativa, turnos, daño, rondas estructuradas  
✅ **Tiradas de dados**: Integración con tiradas manuales (vosotros tiráis, la app calcula)  
✅ **Soporte para 3-6 jugadores**: Flexible según quién pueda jugar cada día  
✅ **Guardado automático**: Continúa tu campaña cuando quieras  
✅ **Acciones sugeridas**: Si no sabes qué hacer, la IA te da ideas  

## 🚀 Instalación Rápida

### Opción 1: Con Docker (RECOMENDADO - Más Fácil) 🐳

**Requisitos:**
- **Docker Desktop** (descárgalo desde [docker.com](https://www.docker.com/products/docker-desktop))
- **Clave API de Anthropic** (obtenerla en [console.anthropic.com](https://console.anthropic.com))

**Pasos:**

1. Descarga y descomprime la carpeta DMAI
2. Crea un archivo `.env` con tu clave:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
   ```
3. Abre Terminal en la carpeta DMAI
4. **Un solo comando:**
   ```bash
   docker-compose up
   ```
5. Abre navegador en: `http://localhost:5173`

**Ver más detalles en [DOCKER_GUIDE.md](DOCKER_GUIDE.md)**

---

### Opción 2: Con Node.js (Instalación Manual)

**Requisitos:**
- **Node.js 18+** (descargarlo desde [nodejs.org](https://nodejs.org))
- **Clave API de Anthropic** (obtenerla en [console.anthropic.com](https://console.anthropic.com))

**Pasos:**

1. **Clona o descarga este repositorio**
   ```bash
   cd DMAI
   ```

2. **Instala las dependencias del servidor**
   ```bash
   npm install
   ```

3. **Instala las dependencias del cliente**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configura tu API key**
   - Copia `.env.example` a `.env`
   - Abre `.env` y pega tu clave de API:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
   ```

5. **Inicia la aplicación**
   
   - Terminal 1: `npm run dev`
   - Terminal 2: `npm run client`

6. **Abre en el navegador**
   ```
   http://localhost:5173
   ```

## 🎮 Cómo Jugar

### 1. Crear una Campaña
- Pulsa **"Nueva Campaña"**
- Pon un nombre épico (ej: "La Mina Perdida de Durth-Karim")
- **Añade jugadores**: Crea los personajes directamente o copia sus datos de D&D Beyond
  - Nombre, raza, clase, nivel 4
  - Puntuaciones de habilidad (STR, DEX, CON, INT, WIS, CHA)
  - Puntos de vida y Clase de Armadura
- Necesitas **mínimo 3 jugadores, máximo 6**

### 2. Comenzar la Aventura
- Pulsa **"Comenzar Aventura"**
- La IA generará el inicio de vuestra historia nueva

### 3. Narración y Acciones
- Cada jugador dice qué hace su personaje
- La IA responde de forma narrativa y coherente
- Si no se os ocurre nada, pulsa **"Ver Sugerencias"** para ideas

### 4. Combate
- Pulsa **"Iniciar Combate"** cuando empiece la batalla
- Todos tiran un **d20 de iniciativa** (dados reales en la mesa)
- Introducid los resultados en la app
- La app ordena el turno automáticamente
- En vuestro turno:
  - Decidís qué ataca
  - Tiráis el ataque (d20)
  - Introducid el resultado y el daño
  - La app valida si acierta y actualiza HP

### 5. Guardar Progreso
- La app **guarda automáticamente** todo después de cada acción
- Podéis cerrar y continuar después sin perder nada

## 📊 Características de Personaje

Cada personaje incluye:
- **Nombre y raza** (Humano, Elfo, Enano, Mediano, Dracónido, Gnomo, Semielfo, Semiorco, Tiefling, Kobold, Orco)
- **Clase** (Bárbaro, Bardo, Clérigo, Druida, Guerrero, Monje, Paladín, Explorador, Pícaro, Hechicero, Brujo, Mago)
- **Nivel** (Siempre 4, pero personalizable)
- **Puntuaciones de habilidad** (STR, DEX, CON, INT, WIS, CHA)
- **Puntos de vida (HP)**
- **Clase de Armadura (AC)**

## ⚔️ Sistema de Combate

- **Iniciativa**: Todos tiran d20, la app ordena el turno
- **Turnos**: Cada jugador actúa en orden
- **Ataques**: Dices qué atacas, tiras d20, introduces el resultado
- **Daño**: Especifica cuánto daño hace y de qué tipo
- **HP**: Se actualiza automáticamente
- **Fin del combate**: Pulsa el botón cuando termina

## 💾 Datos Guardados

Todo se guarda automáticamente en carpetas JSON:
```
server/data/campaigns/
├── [id-campaña-1].json
├── [id-campaña-2].json
└── ...
```

Puedes ver todos tus progresos en la pantalla de inicio.

## 🐛 Troubleshooting

### Error "Cannot find module"
```bash
npm install
cd client && npm install && cd ..
```

### Error "ANTHROPIC_API_KEY is not set"
- Comprueba que el archivo `.env` existe
- Verifica que la clave esté escrita correctamente
- No uses comillas alrededor de la clave

### Error de conexión al servidor
- Asegúrate de que el servidor está ejecutándose en terminal 1: `npm run dev`
- Asegúrate de que el cliente se ejecuta en puerto 5173

### La IA no responde
- Comprueba que tienes tokens suficientes en tu cuenta de Anthropic
- Verifica la conexión a internet

## 📝 Notas para Principiantes

- **No necesitáis conocer toda D&D 5e**, la app gestiona las reglas
- **Los dados los tiráis vosotros físicamente** en la mesa (más divertido)
- **Podéis modificar cualquier cosa**: Editad los archivos JSON si queréis cambiar personajes
- **Podéis parar cuando queráis**: El progreso se guarda automáticamente

## 🎯 Próximas Mejoras Posibles

- Hechizos y poderes especiales
- Más tipos de enemigos y encuentros
- Mapas tácticos visuales
- Fondos ambientales y música
- Más detalles de D&D 5e

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir

---

**¿Dudas?** Revisa el código o crea un issue en el repositorio.

¡Que disfrutéis la aventura! ⚔️🐉
