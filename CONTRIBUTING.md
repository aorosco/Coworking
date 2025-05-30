## Estrategia de ramas

- **main**: Rama estable. Solo código probado y listo para producción.
- **develop**: Rama de integración. Aquí se integran todas las nuevas funcionalidades y correcciones antes de pasar a producción.
- **feature/xxx**: Para nuevas funcionalidades. Ejemplo: `feature/registro-usuario`.
- **bugfix/xxx**: Para corrección de errores detectados en desarrollo.
- **hotfix/xxx**: Para correcciones urgentes en producción.

## Flujo de trabajo recomendado

1. Todo parte desde `develop`.
2. Se crea una rama `feature/xxx` desde `develop`.
3. Se desarrolla la funcionalidad o corrección en la rama correspondiente.
4. Al terminar, se crea un Pull Request de la rama `feature/xxx` hacia `develop`.
5. Se revisa el código y, si pasa la revisión y los tests, se hace merge a `develop`.
6. En `develop` se integran y prueban todas las features y bugfixes.
7. Cuando se decide lanzar una versión estable, se hace merge de `develop` a `main` y se etiqueta la versión (ejemplo: `v1.0.0`). 