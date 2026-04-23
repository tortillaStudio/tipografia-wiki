---
title: FontPreview Component
description: FontPreview Component Documentation
sidebar:
  badge: Nuevo
---

## Overview

`FontPreview` es un componente interactivo de Astro que permite visualizar y experimentar con fuentes tipográficas directamente en el navegador. Proporciona controles intuitivos para:

- Ajustar tamaño de fuente y alto de línea
- Probar diferentes instancias/pesos de fuente
- Experimentar con ejes de variación (variable fonts)
- Activar características OpenType (ligaduras, alternates, etc.)
- Animar automáticamente ejes de fuente
- Editar el texto en tiempo real

---

## Instalación y Uso Básico

### Importar el Componente

```astro
---
import FontPreview from '../components/FontPreview.astro';
---

<FontPreview
  fontPath="/fontFiles/MiFont.woff2"
/>
```

### Ejemplo Minimal

```astro
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  fontSize={72}
  suggestedText="The quick brown fox jumps over the lazy dog"
/>
```

---

## Props (Parámetros)

### `fontPath` (Requerido)

**Tipo:** `string`

Ruta absoluta al archivo de fuente. Soporta formatos `.woff2`, `.ttf`, `.otf`.

```astro
<FontPreview
  fontPath="/fontFiles/Outpact-VF.ttf"
/>
```

---

### `text`

**Tipo:** `string`  
**Default:** `''` (vacío)

Texto que se mostrará inicialmente en el preview. Si está vacío, usará `suggestedText`.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  text="Hola Mundo"
/>
```

---

### `suggestedText`

**Tipo:** `string`  
**Default:** `'The quick brown fox jumps over the lazy dog'`

Texto placeholder/sugerencia que aparecerá si `text` está vacío. Los usuarios pueden editarlo.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  suggestedText="Tu texto de prueba aquí"
/>
```

---

### `fontSize`

**Tipo:** `number`  
**Default:** `72`

Tamaño inicial de la fuente en píxeles. El usuario puede ajustarlo con el slider.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  fontSize={48}
/>
```

---

### `maxFontSize`

**Tipo:** `number`  
**Default:** `150`

Tamaño máximo permitido en el slider de tamaño. Define el rango superior del control.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  fontSize={72}
  maxFontSize={200}
/>
```

---

### `isSingleLine`

**Tipo:** `boolean`  
**Default:** `false`

Si es `true`, el texto no se ajusta (no hay saltos de línea) y se adapta automáticamente con Fitty.js para caber en el ancho disponible. Útil para headlines.

```astro
<!-- Multi-línea (by default) -->
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
/>

<!-- Una sola línea, adaptive -->
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  isSingleLine={true}
  suggestedText="Outpact is really neat"
/>
```

---

### `bgColor`

**Tipo:** `string`  
**Default:** `'#ffffff'`

Color de fondo del contenedor. Acepta cualquier valor CSS válido.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  bgColor="#f0f0f0"
/>

<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  bgColor="rgb(240, 100, 100)"
/>
```

---

### `fgColor`

**Tipo:** `string`  
**Default:** `'#1b1d1b'`

Color del texto (foreground). Acepta cualquier valor CSS válido.

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  fgColor="#333333"
/>

<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  fgColor="rgb(200, 50, 50)"
/>
```

---

### `enabledFeatures`

**Tipo:** `Record<string, boolean>`  
**Default:** `{}`

Especifica qué características OpenType mostrar y habilitar inicialmente. Los tags deben corresponder con las características disponibles en la fuente (ej: `subs`, `sups`, `swsh`, `kern`, etc.).

```astro
<!-- Mostrar solo subscripts, sin kerning -->
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  enabledFeatures={{
    subs: true,
    kern: false
  }}
/>

<!-- Mostrar ligaduras -->
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  enabledFeatures={{
    liga: true
  }}
/>
```

Si no especificas `enabledFeatures`, el componente mostrará automáticamente las características comunes encontradas en la fuente.

---

### `instance`

**Tipo:** `string | number`  
**Default:** `''`

Preselecciona una instancia/peso específico de la fuente. Puede ser:

- Un número (índice de la instancia)
- Un string (nombre de la instancia ej: `"Bold"`, `"Light Italic"`)

```astro
<!-- Por nombre -->
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  instance="ExtraLight italic"
/>

<!-- Por índice -->
<FontPreview
  fontPath="/fontFiles/Outpact/Outpact-VF.ttf"
  instance={0}
/>
```

---

### `axisValues`

**Tipo:** `Record<string, number>`  
**Default:** `{}`

Establece valores iniciales para los ejes de variación. Los tags deben coincidir con los ejes disponibles en la fuente variabel (ej: `wght`, `wdth`, `slnt`, `VOLM`, `FLAR`, etc.).

```astro
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  axisValues={{
    wght: 400,  // Weight
    wdth: 100,  // Width
    slnt: -12   // Slant
  }}
/>
```

---

### `axisAnimationConfig`

**Tipo:** `Record<string, { speed?: number; step?: number }>`  
**Default:** `{}`

Configura la animación automática de ejes. Cada entrada especifica:

- `speed`: Velocidad en milisegundos entre pasos
- `step`: Incremento/decremento por paso

Los botones con ▶ en cada eje permiten iniciar/pausar la animación.

```astro
<!-- Animar weight lentamente, width rápido -->
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  axisAnimationConfig={{
    wght: { speed: 50, step: 20 },   // Weight: 100-900
    VOLM: { speed: 15, step: 5 },    // Width: 0-100
    slnt: { speed: 80, step: 1 }     // Slant: 0 a -12
  }}
/>

<!-- Animación rápida de weight -->
<FontPreview
  fontPath="/fontFiles/Outpact/Outpact-VF.ttf"
  axisAnimationConfig={{
    wght: { speed: 10, step: 10 }
  }}
/>
```

**Recomendaciones:**

- `speed` bajo (ejs: 10-30) = animación rápida
- `speed` alto (ejs: 80+) = animación lenta
- `step` debe ser pequeño para ejes de rango grande (wght, VOLM)
- `step` puede ser 1 para ejes de rango pequeño (slnt)

---

### `staticFonts`

**Tipo:** `Record<string, string>`  
**Default:** `{}`

Proporciona múltiples fuentes estáticas en lugar de una variable. Crea un selector dropdown para cambiar entre ellas.

```astro
<FontPreview
  fontPath="/fontFiles/Fallback.ttf"
  staticFonts={{
    "Regular": "/fontFiles/MyFont-Regular.ttf",
    "Bold": "/fontFiles/MyFont-Bold.ttf",
    "Italic": "/fontFiles/MyFont-Italic.ttf"
  }}
/>
```

---

### `defaultStaticFont`

**Tipo:** `string`  
**Default:** `''`

Cuando usas `staticFonts`, especifica cuál es la preseleccionada por defecto.

```astro
<FontPreview
  fontPath="/fontFiles/Fallback.ttf"
  staticFonts={{
    "Regular": "/fontFiles/MyFont-Regular.ttf",
    "Bold": "/fontFiles/MyFont-Bold.ttf"
  }}
  defaultStaticFont="Bold"
/>
```

---

## Ejemplos Completos

### Ejemplo 1: Variable Font con Animación

```astro
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  fontSize={72}
  suggestedText="Animación interactiva"
  fgColor="#1b1d1b"
  bgColor="#ffffff"
  axisAnimationConfig={{
    wght: { speed: 30, step: 20 },
    VOLM: { speed: 30, step: 2 },
    slnt: { speed: 80, step: 1 },
    FLAR: { speed: 20, step: 3 }
  }}
/>
```

**Resultado:** Un preview con botones para animar cada eje de variación. El usuario pueden apretar ▶ para ver la animación.

---

### Ejemplo 2: Titular de una Línea

```astro
<FontPreview
  fontPath="/fontFiles/Outpact/Outpact-VF.ttf"
  isSingleLine={true}
  fontSize={48}
  suggestedText="Hola Outpact"
  axisAnimationConfig={{
    wght: { speed: 10, step: 10 }
  }}
/>
```

**Resultado:** El texto se adapta automáticamente al ancho disponible. Sin slider de tamaño.

---

### Ejemplo 3: Fuentes Estáticas

```astro
<FontPreview
  fontPath="/fontFiles/Fallback.ttf"
  staticFonts={{
    "Light": "/fontFiles/MyFont-Light.ttf",
    "Regular": "/fontFiles/MyFont-Regular.ttf",
    "Bold": "/fontFiles/MyFont-Bold.ttf",
    "Black": "/fontFiles/MyFont-Black.ttf"
  }}
  defaultStaticFont="Regular"
  fontSize={64}
/>
```

**Resultado:** Un dropdown selector para cambiar entre diferentes pesos pregenrados.

---

### Ejemplo 4: Con Características Específicas

```astro
<FontPreview
  fontPath="/fontFiles/MyFont.ttf"
  fontSize={56}
  text="Testing 1234 f_i fi"
  enabledFeatures={{
    liga: true,      // Ligaduras
    dlig: true,      // Ligaduras discrecionales
    subs: true,      // Subscripts
    sups: true       // Superscripts
  }}
/>
```

**Resultado:** Botones para toggle de cada feature. Los usuarios pueden experimentar activando/desactivando.

---

### Ejemplo 5: Variables Iniciales

```astro
<FontPreview
  fontPath="/fontFiles/Commissioner-VariableFont.ttf"
  fontSize={80}
  text="Preset values"
  instance="SemiBold"
  axisValues={{
    wght: 600,
    VOLM: 75,
    slnt: -6
  }}
/>
```

**Resultado:** Carga con valores específicos preestablecidos, que el usuario puede ajustar después.

---

## Características Técnicas

### Controles Disponibles

| Control                | Descripción                                 | Siempre Visible             |
| ---------------------- | ------------------------------------------- | --------------------------- |
| **Size Slider**        | Ajusta tamaño de fuente (12-150px)          | Sí                          |
| **Line Height Slider** | Ajusta alto de línea (0.8-3)                | Sí                          |
| **Instance Selector**  | Dropdown de instancias (si aplica)          | Si hay múltiples instancias |
| **Axis Sliders**       | Un slider por eje de variación              | Si la fuente es variable    |
| **Feature Buttons**    | Botones para activar/desactivar OT features | Si hay features disponibles |
| **Text Textarea**      | Editable, contenido en tiempo real          | Sí                          |

### Carga de Metadata

El componente automáticamente:

1. Intenta cargar metadata del archivo `.ttf` o `.otf` (convirtiendo desde `.woff2`)
2. Detecta ejes disponibles en la fuente
3. Detecta instancias predefinidasCEA
4. Detecta características OpenType disponibles

Si no encuentra metadata, funciona pero sin controles avanzados.

### Intersection Observer

El componente usa Intersection Observer para modo "lazy":

- Cuando el elemento está fuera de vista: opacidad al 60%
- Cuando el elemento entra en vista: opacidad 100%

---

## Casos de Uso Comunes

### 📖 Documentación de Fuente

```astro
<FontPreview
  fontPath="/fontFiles/MyFont-VF.ttf"
  fontSize={72}
  maxFontSize={120}
  suggestedText="Prueba interactiva"
/>
```

### 🎨 Selector de Variantes

```astro
<FontPreview
  fontPath="/fontFiles/MyFont-Regular.ttf"
  staticFonts={{
    "Thin": "/fontFiles/MyFont-Thin.ttf",
    "Light": "/fontFiles/MyFont-Light.ttf",
    "Regular": "/fontFiles/MyFont-Regular.ttf",
    "Bold": "/fontFiles/MyFont-Bold.ttf"
  }}
/>
```

### 🎬 Demo Animada

```astro
<FontPreview
  fontPath="/fontFiles/MyFont-VF.ttf"
  isSingleLine={true}
  axisAnimationConfig={{
    wght: { speed: 20, step: 15 }
  }}
/>
```

### 📝 Generador de Especímenes

```astro
<FontPreview
  fontPath="/fontFiles/MyFont-VF.ttf"
  text="Lorem ipsum dolor sit amet"
  fontSize={48}
  enabledFeatures={{
    liga: true,
    kern: true
  }}
/>
```

---

## Notas Técnicas

### Archivos Necesarios

- **Componente:** `src/components/FontPreview.astro`
- **Lógica:** `src/utils/FontPreview.ts`
- **Estilos:** `src/styles/components/font-preview.css`
- **Dependencias:** `opentype.js` (importado como módulo en `FontPreview.ts`)

### Soportes de Navegador

- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- Requiere soporte para:
  - FontFace API
  - CSS Custom Properties
  - IntersectionObserver

### Rendimiento

- Carga lazy de metadata OpenType
- La animación de ejes usa `setInterval` (pausable)
- Fitty.js para redimensionamiento responsive en modo single-line

---

## Troubleshooting

### El preview no muestra la fuente

- ✓ Verifica que `fontPath` sea correcto y accesible
- ✓ Asegúrate de que el formato sea soportado (.woff2, .ttf, .otf)

### No aparecen los ejes de variación

- ✓ Verifica que la fuente sea variable font
- ✓ Intenta especificar manualmente con `axisValues`

### Las características OpenType no aparecen

- ✓ Verifica que la fuente tenga tabla `GSUB` o `GPOS`
- ✓ Usa `enabledFeatures` para forzar su visualización

### El texto se corta en single-line mode

- ✓ Reduce `fontSize` o aumenta el ancho del contenedor
- ✓ Acorta el `suggestedText`

---

## API Interna (FontPreview.ts)

La clase `FontPreview` maneja:

| Método                  | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `loadFontFace()`        | Carga el archivo de fuente                     |
| `loadMetadata()`        | Extrae data de ejes/instancias con opentype.js |
| `setupControls()`       | Inicializa todos los sliders y selectores      |
| `setupEventListeners()` | Conecta cambios de UI con actualizaciones      |
| `updateFontVariation()` | Aplica variation settings y feature settings   |
| `toggleAxisAnimation()` | Inicia/pausa animación de eje                  |
| `initFitty()`           | Inicializa Fitty.js para single-line           |

---

## Versión y Changelog

**Versión Actual:** 1.0  
**Última Actualización:** 2026

Características implementadas:

- ✅ Variable Font support
- ✅ Static fonts selector
- ✅ Axis animation
- ✅ OpenType features toggle
- ✅ Responsive design
- ✅ Intersection Observer
- ✅ Single-line mode con Fitty
