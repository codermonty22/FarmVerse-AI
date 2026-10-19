# Architecture

FarmVerse is currently a repository containing two separate applications:

```text
Browser
  └── frontend/ — React + TypeScript + Vite (npm)
      ├── src/components/ — feature-oriented screens and shared UI
      ├── src/services/   — browser persistence and feature calculations
      ├── src/data/       — bundled demonstration catalogs
      ├── src/i18n/       — English, Marathi, and Hindi translations
      └── public/         — app icon and web manifest

backend/ — Spring Boot + PostgreSQL
  ├── src/main/java/com/farmverse/backend/ — config, DTOs, entities,
  │   repositories, security, services, and exception handling
  └── src/main/resources/db/migration/      — Flyway SQL migrations

ml-service/ — not implemented
```

`metadata.json` and `.env.example` remain at the repository root because they belong to the existing AI Studio hosting integration, not the Vite app bundle.

The frontend's navigation is managed in `frontend/src/App.tsx`; it is a single-page app with feature views, not a URL router. Its service module currently reads/writes browser storage and invokes local demo calculations. It has no HTTP client configured for the Java backend.

The backend is a standalone Maven project. PostgreSQL settings and JWT configuration are read from environment variables, and Flyway owns schema creation. The project currently has no application REST controllers, so its business services are not yet exposed to the frontend.

When implemented, the Python ML service should remain a separately deployed service. The backend is configured with `PYTHON_ML_SERVICE_URL` and `PYTHON_ML_SERVICE_TIMEOUT_MS` for a future server-to-server integration. No model, dataset, or Python scaffold is included until there is a real implementation.

Current demo catalogs and sample outputs are illustrative, not live data or trained-model results. Replace them with verified data sources and service integrations before presenting them as operational recommendations.
