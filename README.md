# Sistema de Reservas de Coworking 🏢

Sistema completo para la gestión de espacios de coworking, que permite a los usuarios reservar espacios de trabajo, salas de reuniones y oficinas privadas.

## Características 🌟

- Registro y autenticación de usuarios
- Gestión de espacios de trabajo
- Sistema de reservas en tiempo real
- Panel de administración
- Interfaz moderna y responsive

## Tecnologías Utilizadas 💻

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT para autenticación

### Frontend
- React
- Material-UI
- React Router
- Axios
- Context API

## Requisitos Previos 📋

- Node.js (v18 o superior)
- PostgreSQL (v15 o superior)
- Docker y Docker Compose (opcional)

## Instalación y Uso 🚀

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/coworking-reservation-system.git
cd coworking-reservation-system
```

2. Configurar el backend:
```bash
cd backend
cp .env.example .env
npm install
```

3. Configurar el frontend:
```bash
cd frontend
cp .env.example .env
npm install
```

4. Iniciar con Docker Compose:
```bash
docker-compose up --build
```

O iniciar localmente:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Variables de Entorno 🔐

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/coworking
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api/v1
```

## Estructura del Proyecto 📁

```
.
├── backend/             # Servidor Node.js/Express
│   ├── src/            # Código fuente
│   ├── tests/          # Tests
│   └── package.json    # Dependencias
├── frontend/           # Cliente React
│   ├── src/           # Código fuente
│   ├── public/        # Archivos estáticos
│   └── package.json   # Dependencias
└── docker-compose.yml # Configuración de Docker
```

## API Endpoints 🛣️

### Autenticación
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/profile

### Espacios
- GET /api/v1/spaces
- GET /api/v1/spaces/:id
- POST /api/v1/spaces
- PUT /api/v1/spaces/:id
- DELETE /api/v1/spaces/:id

### Reservas
- GET /api/v1/bookings
- POST /api/v1/bookings
- PUT /api/v1/bookings/:id
- DELETE /api/v1/bookings/:id

## Contribuir 🤝

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto 📧

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - email@example.com

Link del proyecto: [https://github.com/tu-usuario/coworking-reservation-system](https://github.com/tu-usuario/coworking-reservation-system)
