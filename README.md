# TEvoSales Frontend

**Versión:** 1.0.1

TEvoSales Frontend es una aplicación web desarrollada con React y Vite que sirve como interfaz de usuario para la gestión y visualización de ventas. La aplicación está diseñada para ser rápida, moderna y fácil de mantener, utilizando las últimas tecnologías del ecosistema JavaScript.

![Image Front](https://i.imgur.com/5JVctRi.png)

## Tecnologías y versiones utilizadas

- **Lenguaje principal:** JavaScript (ES2022+)
- **Framework de UI:** [React](https://react.dev/) v19.1.0
- **Empaquetador:** [Vite](https://vitejs.dev/) v6.3.5
- **Estilos:** [TailwindCSS](https://tailwindcss.com/) v4.1.8
- **Otras dependencias principales:**
  - @mui/material v7.1.1
  - react-router-dom v7.6.2
  - axios v1.9.0

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior (incluido con Node.js)

## Instalación

1. **Clona el repositorio desde GitHub:**

   ```bash
   git clone https://github.com/TraumaticEvolutions/TEvoSales-Frontend.git
   cd TEvoSales-Frontend
   ```

2. **Instala las dependencias**

```bash
  npm install
```

3. **Configuración de variables de entorno**

Renombre el archivo de ejemplo de variables de entorno `.env.example` a `.env.local`

```bash
cp .env.example .env.local
```

3. **Configura y levanta el back**

Repositorio y guía de instalación: [TEvoSales-BackEnd](https://github.com/TraumaticEvolutions/TEvoSales-Backend)

4. **Ejecución de la aplicación**

```bash
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`
El CORS del back esta configurado para esta dirección, si el puerto es distinto habría que ocnfigurarlo en el back o cambiar al `5173`

## Equipo de Desarrollo

- [**Ángel Miguel Aragón** - _@Algol95_](https://github.com/Algol95)
