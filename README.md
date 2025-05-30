## 🚀 Levantar el entorno con Docker

Asegúrate de tener Docker y Docker Compose instalados.

Para levantar todos los servicios (frontend, backend y base de datos) ejecuta:

```bash
docker-compose up --build
```

Esto iniciará:
- Frontend en [http://localhost:3000](http://localhost:3000)
- Backend en [http://localhost:5000](http://localhost:5000)
- PostgreSQL en el puerto 5432
