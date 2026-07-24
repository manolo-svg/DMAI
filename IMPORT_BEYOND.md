# 📋 Importar Personajes desde D&D Beyond

D&D Beyond es una plataforma online para D&D. Si tenéis vuestros personajes allí, podéis traerlos a DMAI fácilmente.

## Método 1: Copiar Información Manualmente (Más Fácil)

### Paso a Paso

1. **Abre tu personaje en D&D Beyond**

2. **Copia esta información:**
   - Nombre
   - Raza (en la sección "Ability Scores" o "Race")
   - Clase
   - Nivel (debería ser 4)
   - Las **6 puntuaciones de habilidad**:
     - Strength (Fuerza)
     - Dexterity (Destreza)
     - Constitution (Constitución)
     - Intelligence (Inteligencia)
     - Wisdom (Sabiduría)
     - Charisma (Carisma)
   - HP (Hit Points / Puntos de Vida)
   - AC (Armor Class / Clase de Armadura)

3. **En DMAI:**
   - Pulsa "Nueva Campaña"
   - Pulsa "Añadir Jugador"
   - Rellena los campos con la información
   - Pulsa "Guardar Personaje"

## Método 2: Copiar desde la Hoja Completa

En D&D Beyond, hay un botón de **"Export"** en algunos personajes:

1. Ve a tu personaje
2. Busca "Export" o "Share"
3. Selecciona el formato que mejor te convenga
4. Copia el texto

Luego en DMAI copia los valores que necesites.

## Valores por Defecto si no los Encuentras

Si no encuentras algún valor en D&D Beyond, aquí hay valores razonables para nivel 4:

| Clase | HP por defecto | AC por defecto |
|-------|---|---|
| Bárbaro | 40-45 | 12 |
| Bardo | 25-30 | 14 |
| Clérigo | 30-35 | 16 |
| Druida | 25-30 | 14 |
| Guerrero | 35-40 | 16 |
| Monje | 30-35 | 14 |
| Paladín | 35-40 | 18 |
| Explorador | 30-35 | 14 |
| Pícaro | 25-30 | 14 |
| Hechicero | 20-25 | 12 |
| Brujo | 25-30 | 12 |
| Mago | 20-25 | 12 |

## ¿Dónde Encuentro Cada Valor en D&D Beyond?

### Puntuaciones de Habilidad
- Ve a la pestaña **"Ability Scores"**
- Verás 6 números (Str, Dex, Con, Int, Wis, Cha)
- Cópialos

### HP (Puntos de Vida)
- Pestaña **"Features"** o **"Character Sheet"**
- Busca "Hit Points" o "HP"
- Anota el número total (no el máximo de un d20)

### AC (Clase de Armadura)
- Pestaña **"Features"** o **"Character Sheet"**
- Busca "Armor Class" o "AC"

### Raza y Clase
- Arriba en la página principal del personaje
- Verás algo como "Elfo Pícaro Nivel 4"

## 🤔 Si Tienes Dudas

La app te deja cambiar cualquier valor después:

1. En la pantalla de inicio, selecciona tu campaña
2. Puedes editar los archivos JSON directamente en `server/data/campaigns/`
3. Los cambios se aplican automáticamente

## 📝 Ejemplo Práctico

**Tharok el Bravo (D&D Beyond):**
```
Nombre: Tharok
Raza: Semiorco
Clase: Bárbaro
Nivel: 4
Strength: 16
Dexterity: 12
Constitution: 15
Intelligence: 8
Wisdom: 13
Charisma: 10
HP: 42
AC: 12
```

**En DMAI:**
1. Pulsa "Añadir Jugador"
2. Rellena exactamente con esos valores
3. Pulsa "Guardar Personaje"

¡Listo! Tharok está en tu campaña de DMAI.

---

Si hay problemas con los valores, puedes editarlos directamente en el archivo JSON de la campaña después.

¡Que disfrutes! 🐉
