# FarmVerse AI

FarmVerse AI is a farmer-focused agricultural decision-support demo for Indian farmers. Its React interface brings together crop recommendations, disease guidance, mandi information, farm planning, waste-to-wealth ideas, government schemes, and multilingual assistance. Current catalogs and examples are bundled demo data; they are not live or independently verified agricultural advice.

## Project layout

```text
.
├── backend/        Spring Boot and PostgreSQL application
├── docs/           Architecture and current API status
├── frontend/       React, TypeScript, and Vite application
├── .editorconfig   Shared formatting rules
├── .env.example    Optional AI Studio hosting variables
├── .gitignore      Local secrets and generated files
├── metadata.json   Root-level AI Studio hosting metadata
├── .github/        Repository automation and modernization records
└── .vscode/        Shared editor settings
```

There is no `ml-service/` yet: Python models, datasets, and service dependencies have not been implemented. No separate `scripts/` directory is needed at this stage.

## Development tools

- Node.js 22 or newer and npm (the frontend lockfile is `frontend/package-lock.json`)
- JDK 25 and Maven 3.9 or newer
- Docker Compose for local PostgreSQL

## Start the frontend

In a PowerShell terminal opened at the repository root:

```powershell
Set-Location .\frontend
npm ci
npm run dev
```

The Vite development server is at `http://localhost:3000`. Check types and create a production build with `npm run lint` and `npm run build`.

## Start PostgreSQL and the Java backend

Use a **separate PowerShell terminal** opened at the repository root. Keep it at the repository root for these commands; `-f .\backend\pom.xml` explicitly selects the Maven project so Maven is not accidentally run from `frontend/`.

```powershell
if (!(Test-Path .\backend\.env)) { Copy-Item .\backend\.env.example .\backend\.env }
```

Edit `backend/.env` to set `DB_PASSWORD` and a randomly generated `JWT_SECRET` of at least 32 bytes. If Docker Compose is installed, start PostgreSQL from the repository root:

```powershell
docker compose --env-file .\backend\.env -f .\backend\compose.yaml up -d postgres
```

In the same PowerShell session, load the environment values and start Spring Boot from the repository root:

```powershell
Get-Content .\backend\.env | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}
java -version
mvn -version
mvn -f .\backend\pom.xml spring-boot:run
```

Confirm `mvn -version` reports Java 25, which is the backend's configured compiler target. If it reports another version, set `JAVA_HOME` to an installed JDK 25 and reopen PowerShell before starting Maven. The backend listens on `http://localhost:8080`; Flyway applies the SQL migrations at startup. Run its automated test lifecycle from the repository root with `mvn -f .\backend\pom.xml clean test`. There are currently no Java test source files, so add tests as backend endpoints and behavior are implemented.

## Frontend/backend integration

The frontend does **not** currently call the Java backend. Its [apiService.ts](./frontend/src/services/apiService.ts) module uses browser `localStorage` and bundled demo data; the Java project has configuration, DTOs, entities, repositories, services, and migrations, but no application REST controllers. The backend's OpenAPI and actuator configuration is documented in [docs/api-reference.md](./docs/api-reference.md). Do not treat the UI demo data as live market, diagnosis, or government data.

## Environment variables

Copy [backend/.env.example](./backend/.env.example) to the ignored `backend/.env` and replace the local placeholders before starting the database or application. The backend uses `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, `SERVER_PORT`, `CORS_ALLOWED_ORIGINS`, `PYTHON_ML_SERVICE_URL`, and `PYTHON_ML_SERVICE_TIMEOUT_MS`.

The root [`.env.example`](./.env.example) preserves the AI Studio hosting variables `GEMINI_API_KEY` and `APP_URL`; [metadata.json](./metadata.json) remains at the repository root for the hosting platform. The current frontend source does not read these variables directly; do not place private keys in browser-exposed `VITE_*` variables.

## Data and future services

The Java backend is the planned REST and persistence layer. The future Python ML service can be added as a separate project and integrated server-to-server through the configured `PYTHON_ML_SERVICE_URL`; no Python implementation or dependency file is created until that service exists. Real mandi feeds, verified agronomic datasets, disease models, scheme integrations, and live AI integrations remain future work.

See [docs/architecture.md](./docs/architecture.md) for current component boundaries, [docs/api-reference.md](./docs/api-reference.md) for the existing API surface, and [docs/project-cross-check-report.md](./docs/project-cross-check-report.md) for the verification results and hands-on review checklist.
