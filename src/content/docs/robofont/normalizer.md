---
title: Normalizar
description: Una página de referencia en mi nuevo sitio de documentación Starlight.
sidebar:
  badge: Nuevo
---

## ufoNormalizer

Proporciona un formateo estándar para que existan **diffs significativos** en el control de versiones, en lugar de ruido visual por el formato.

Ejemplos de los ajustes aplicados por `ufoNormalizer`:

- Cambiar números de punto flotante a enteros cuando no altera el valor (ej. `x="95.0"` se convierte en `x="95"`).
- Redondear números de punto flotante a 10 dígitos.
- Formatear el XML con pestañas (tabs) en lugar de espacios.

---

## Uso en RoboFont

RoboFont incluye `ufoNormalizer` preinstalado, y puedes configurar una preferencia para normalizar los archivos UFO al guardar.

Simplemente abre la **Scripting Window** y ejecuta el siguiente código:

```python wrap
from mojo.UI import setDefault, getDefault

setDefault("shouldNormalizeOnSave", True)

print("shouldNormalizeOnSave está configurado como " + str(getDefault("shouldNormalizeOnSave")))
```

## Uso avanzado

### Instalación

Instala estas herramientas utilizando el paquete pip alojado en PyPI:

```bash
pip install --upgrade ufonormalizer
```

### Línea de comandos

Para usarlo desde la terminal:

```bash
ufonormalizer <ruta>/font.ufo
```

Para ver todos los argumentos disponibles, ejecuta:

```bash
ufonormalizer --help
```

**Nota**: Si estás trabajando en un UFO dentro de RoboFont y ejecutas ufoNormalizer sobre ese mismo archivo, RoboFont te notificará que el UFO ha sido actualizado externamente. Simplemente acepta seleccionando "Update".

## Automatización mediante Git hooks

Más allá del uso básico en la línea de comandos, `ufoNormalizer` puede utilizarse de forma automatizada.

Puedes integrarlo en un script de shell o de Python, pero una posibilidad muy útil es usarlo dentro de un Git hook.

> Los Git hooks son scripts que Git ejecuta antes o después de eventos como: `commit`, `push` y `receive`. Son una función integrada (no requieren descargas externas) y se ejecutan localmente. — Fuente: Git Hooks

Es sencillo configurar un hook de Git que normalice los UFOs en un proyecto inmediatamente antes de cada commit, asegurando que siempre guardes datos limpios.

### Configuración del hook

En un proyecto de Git, navega a /.git/hooks, reemplaza el contenido de pre-commit.sample con el siguiente código y elimina la extensión del archivo:

```bash wrap

#!/bin/sh

# Script de hook para verificar lo que está a punto de ser committeado.

# Ejecutado por "git commit" sin argumentos.

# Activa este hook guardándolo en <tu_proyecto>/.git/hooks/pre-commit (sin extensión).

set -e

for ufo in ./\*.ufo; do
ufonormalizer "$ufo"
done

```

Ahora, cada vez que hagas un commit, todos los archivos `.ufo` en tu proyecto de Git se normalizarán antes de que Git los registre.

Importante: Debido a que este hook se configura dentro del proyecto actual, solo se aplicará a dicho proyecto. Tendrás que actualizar cada proyecto individualmente si deseas normalizar UFOs en otros lugares. Si quieres que este hook se añada a todos tus futuros proyectos de Git, puedes configurar una plantilla global (`git template`), aunque este enfoque quizás no sea ideal si también trabajas en proyectos que no contienen archivos UFO.
