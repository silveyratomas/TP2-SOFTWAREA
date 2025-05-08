# TP2-SOFTWARE 🧪🔐

Trabajo práctico N.º 2 de la materia **Ingeniería de Software Aplicada**: Validación de datos de usuario con interfaz en **Electron**, uso de **Puppeteer** y testeo automático con **Jest** y **GitHub Actions**.

## 📁 Requisitos

- Node.js >= 18.x
- npm >= 9.x

## 🚀 Instalación

Cloná el repositorio y ejecutá:

```bash
npm install
````

Esto instalará todas las dependencias necesarias (Electron, Puppeteer, Jest, etc).

## ▶️ Uso de la aplicación

Para iniciar la app de escritorio con Electron:

```bash
npm start
```

Esto abrirá la aplicación que carga los datos del archivo `datos_usuario.json` y valida campos como nombre, email, teléfono y contraseña.

## ✅ Tests

Para correr los tests de validación con cobertura:

```bash
npm test
```

Esto ejecutará `jest --coverage`, con pruebas para:

* Email válido e inválido
* Contraseñas válidas y cortas
* Campos vacíos y no vacíos

## 🧪 Integración Continua (CI)

El proyecto incluye un flujo de trabajo con **GitHub Actions** que:

1. Instala dependencias
2. Ejecuta los tests
3. Informa si hay errores en validaciones

Cada `push` o `pull request` activa automáticamente la ejecución de `npm test` en CI.

## 🛠️ Estructura del Proyecto

```
📦 TP2-SOFTWAREA
├── main.js                 # Lógica principal de Electron
├── datos_usuario.json      # Datos de entrada para validaciones
├── validaciones.js         # Funciones de validación
├── validaciones.test.js    # Tests unitarios con Jest
├── package.json            # Configuración y scripts
└── .github/workflows       # Configuración de CI
```

## 👨‍💻 Autores

Silveyra Tomás, Waniukiewicz Nicolás, Stupniki Hernán, Andrusyszyn Emiliano, Tarnowski Tobias

---

**Profesor responsable:**
Kutz Rene Gabriel
---
Ingeniería de Software
## 📄 Licencia

MIT – Usar, compartir y modificar libremente con atribución.

```

---

¿Querés que también cree un badge de GitHub Actions para mostrar en el README si los tests pasan?
```
