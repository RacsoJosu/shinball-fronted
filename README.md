# 🏠 Shinball Frontend

**Shinball Admin** es una aplicación para la administracion de **usuarios, dashboard, propiedades y vehículos** , construida con tecnologías modernas de React y optimizada para rendimiento y escalabilidad.

---

## 🧑‍💻 Autor

Desarrollado por **Oscar Vallecillo** — abierto a contribuciones, ideas o feedback.

---

## 📸 Vista previa

![Interfaz de Shinball](/public/interface.png)

---

## ⚙️ Tecnologías utilizadas

- **React 18.3** ⚛️
- **Vite 5 + SWC** 🚀 — compilación ultrarrápida
- **TypeScript 5.8** 🛠 — tipado estático
- **TailwindCSS 4** 💨 con plugins oficiales
- **Heroicons 2 & Lucide React** 🎨 — íconos modernos
- **React Router DOM v6.30** 🧭 — enrutamiento declarativo
- **Zustand** 🗂 — gestión de estado global
- **TanStack Query v5** — manejo de estados asíncronos y cache
- **React Hook Form + Zod** 📝 — validación de formularios
- **ESLint + Prettier** ✅ — estandarización y calidad de código
- **PNPM** 📦 — gestor de dependencias eficiente

---

## 🚀 Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/RacsoJosu/Shinball-Frontend.git
cd Shinball-Frontend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Ejecutar en desarrollo

```bash
pnpm run dev
```

### 4. Scripts disponibles

| Script               | Descripción                                                   |
| -------------------- | ------------------------------------------------------------- |
| \`pnpm run dev\`     | Inicia el servidor de desarrollo en \`http://localhost:3000\` |
| \`pnpm run build\`   | Construye la aplicación para producción                       |
| \`pnpm run preview\` | Sirve la versión de producción localmente                     |
| \`pnpm run lint\`    | Linter de código con ESLint                                   |
| \`pnpm run format\`  | Formatea el código con Prettier                               |

---

## 🗂 Estructura del proyecto

```bash
src/
├── assets/ # Imágenes, fuentes, SVGs y otros recursos
├── components/ # Componentes reutilizables (shadcn-ui)
├── features/ # Features de la aplicación
│ └── <feature>/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── schemas/
│ ├── services/
│ └── types/
├── lib/ # Librerías internas y utilidades
├── providers/ # Contextos y providers globales
├── routes/ # Configuración de rutas con React Router
├── stores/ # Estado global con Zustand
├── shared/ # Componentes o utilidades compartidas entre features
├── utils/ # Helpers, validaciones y funciones auxiliares
└── main.tsx # Entrada principal de la aplicación
```

---

## 💡 Buenas prácticas y recomendaciones

- Mantener las features encapsuladas en su propia carpeta con sus **componentes, hooks, pages, services, types y schemas**.
- Usar **TailwindCSS** con la convención de \`tailwind-merge\` para evitar conflictos de clases.
- Gestionar el estado global con **Zustand** y la caché de datos con **TanStack Query**.
- Validar formularios con **Zod + React Hook Form** para mayor seguridad.
- Utilizar los **plugins de Vite** para optimizar imágenes, SVGs y otros assets.
  EOL
