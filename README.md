# EcoRuta Frontend 🌱

Frontend moderno para la aplicación **EcoRuta** - Plataforma de gestión inteligente de recolección de residuos con sistema de recompensas ecológicas.

## 🚀 Características

- ⚛️ **React 18** con **TypeScript** para desarrollo robusto
- 🎨 **Tailwind CSS v4** con paleta eco-friendly personalizada
- 🔄 **Framer Motion** para animaciones suaves
- 🛣️ **React Router DOM v7** para navegación
- 🔐 **Sistema de autenticación JWT** completo
- 📱 **Diseño responsive** para móviles y desktop
- 🎯 **Dashboards especializados** por rol de usuario

## 🎨 Paleta de Colores Eco-Friendly

- **Eco**: Verdes naturales (#f0fdf4 - #14532d)
- **Ocean**: Azules oceánicos (#f0f9ff - #0c4a6e)
- **Earth**: Tonos tierra (#fefdf8 - #713f12)

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Botones, inputs, modales, etc.
│   └── layout/         # Navbar, footer, sidebar
├── pages/              # Páginas de la aplicación
│   ├── auth/          # Login y registro
│   ├── client/        # Dashboard del cliente
│   ├── company/       # Dashboard de empresas
│   └── admin/         # Panel de administración
├── context/           # Context API para estado global
├── hooks/             # Custom hooks
├── services/          # API services y configuración
├── types/             # Definiciones TypeScript
└── utils/             # Funciones utilitarias
```

## 👥 Roles de Usuario

### 🙋‍♂️ Cliente
- Dashboard con estadísticas personales
- Solicitar recolección de residuos
- Ver historial de solicitudes
- Explorar recompensas disponibles
- Gestionar canjes de puntos

### 🏢 Empresa
- Dashboard de gestión de recolecciones
- Administrar solicitudes asignadas
- Planificación de rutas optimizadas
- Historial de recolecciones realizadas

### 👨‍💼 Administrador
- Panel de control general
- Gestión de usuarios y empresas
- Administración de recompensas
- Reportes y estadísticas completas

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Sebastian-Giraldo15/frontend_ecoruta.git
   cd frontend_ecoruta
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar linter

## 🔌 Integración con Backend

El frontend está configurado para conectarse con la API Django en `http://localhost:8000/api/`

### Endpoints esperados:
- `POST /auth/login/` - Autenticación
- `POST /auth/register/` - Registro de usuarios
- `GET /users/me/` - Perfil del usuario actual
- `GET/POST /collection-requests/` - Gestión de solicitudes
- `GET /rewards/` - Lista de recompensas
- `GET/POST /point-exchanges/` - Gestión de canjes

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^18.2.0 | Framework principal |
| TypeScript | ^5.2.2 | Tipado estático |
| Tailwind CSS | ^4.1.12 | Estilos y diseño |
| Framer Motion | ^12.23.12 | Animaciones |
| React Router | ^7.8.1 | Navegación |
| Axios | ^1.11.0 | Cliente HTTP |
| Vite | ^5.0.8 | Bundler y dev server |

## 🚀 Deployment

### Build para producción
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` listos para deploy en cualquier servidor web estático.

### Recomendaciones de deployment:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Servidor propio con nginx**

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para nueva feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit los cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📱 Screenshots

*[Aquí puedes agregar capturas de pantalla cuando el proyecto esté finalizado]*

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes sugerencias, por favor crear un issue en este repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Equipo de Desarrollo

- **Frontend**: Sebastian Giraldo
- **Backend**: [Agregar nombres del equipo de backend]

---

## 🌍 Contribuyendo a un Mundo Más Verde

EcoRuta es más que una aplicación, es una herramienta para crear conciencia ambiental y facilitar la gestión responsable de residuos. ¡Cada línea de código contribuye a un planeta más limpio! 🌱
