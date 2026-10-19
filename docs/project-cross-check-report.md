# FarmVerse AI — Project Cross-Check Report

**Prepared:** 2026-10-19  
**Purpose:** A practical checklist for reviewing the project locally before treating it as ready for a demo, integration, or deployment.

## Executive summary

FarmVerse is a reorganized monorepo containing a React + TypeScript + Vite frontend and a standalone Spring Boot + PostgreSQL backend. The frontend builds and type-checks; the backend compiles on Java 25. However, the frontend currently runs as a demo using browser storage and bundled examples. It does not call the backend, and the backend has no REST controllers or Java test classes. PostgreSQL startup and browser behavior have not been verified in this environment.

**Readiness:** suitable for reviewing the frontend demo and continuing development; not yet verified as an end-to-end application or production deployment.

## Current project map

```text
.
├── .editorconfig
├── .env.example                # Optional AI Studio hosting variables
├── .gitignore
├── metadata.json               # Root-level AI Studio metadata
├── README.md
├── docs/
│   ├── api-reference.md
│   ├── architecture.md
│   └── project-cross-check-report.md
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── public/                 # Icon and PWA manifest
│   └── src/
│       ├── App.tsx
│       ├── components/         # Feature screens and shared UI
│       ├── data/               # Bundled demonstration catalogs
│       ├── i18n/
│       ├── services/            # Browser storage and demo calculations
│       └── types/
└── backend/
    ├── .env.example
    ├── compose.yaml
    ├── pom.xml
    └── src/main/
        ├── java/com/farmverse/backend/
        │   ├── common/
        │   ├── config/
        │   ├── dto/
        │   ├── entity/
        │   ├── exception/
        │   ├── repository/
        │   ├── security/
        │   └── service/
        └── resources/
            ├── application.yml
            └── db/migration/    # Four Flyway migrations
```

There is no Python ML service, application REST controller, or backend test source tree yet. Those are not silently replaced by scaffolding or mock services.

## Verification results

| Check | Result | What it proves / does not prove |
| --- | --- | --- |
| `npm ci` in `frontend/` | **Passed** | npm can reproduce dependencies from `package-lock.json` |
| `npm run lint` in `frontend/` | **Passed** | TypeScript check completed; this is not a browser or UX test |
| `npm run build` in `frontend/` | **Passed** | Vite generated a production bundle |
| `npm audit` in `frontend/` | **Passed — 0 vulnerabilities** | npm reported no known advisories for the installed frontend dependency tree |
| `mvn clean test-compile -q` on Java 25 | **Passed** | Backend main and test compilation succeeded; there are no test sources |
| `mvn clean test -q` on Java 25 | **Passed, no tests discovered** | Maven lifecycle passed, but it did not exercise application behavior |
| Java direct-dependency CVE scan | **Clear after remediation** | Earlier scan found pgJDBC CVE-2026-54291 in 42.7.11; dependency is now pinned to 42.7.12 and the re-scan was clear |
| `mvn clean verify -Djacoco.skip=false -q` | **Passed, no coverage report** | No Java tests or JaCoCo report are present |
| Docker/PostgreSQL startup | **Not run** | Docker is not installed/available in the checked environment |
| Browser/mobile/assistive-technology checks | **Not run** | A production build does not validate rendering, usability, or accessibility |
| Git status / diff | **Not available** | Workspace is not a Git repository; changes cannot be reviewed through a repository diff |

### Local Java version discrepancy

The checked PowerShell default `java`/`mvn` was Java **21.0.12.1**. Java **25.0.1** is installed and was used successfully for the backend verification by setting `JAVA_HOME` explicitly. Before running Maven locally, cross-check `mvn -version`; it must report Java 25 for this project target. Example for the JDK path present in the checked environment:

```powershell
$env:JAVA_HOME = 'C:\Users\manth\.jdks\openjdk-25.0.1'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
java -version
mvn -version
```

If your JDK 25 is installed elsewhere, use its actual installation directory instead.

## Cross-check checklist

Mark each item only after you personally verify it in your intended environment.

### 1. Repository and configuration

- [ ] Open the repository root, not `frontend/` or `backend/`, in VS Code.
- [ ] Confirm root `README.md`, `docs/architecture.md`, and `docs/api-reference.md` match the current implementation.
- [ ] Confirm `metadata.json` and the root `.env.example` are needed by the intended AI Studio hosting workflow.
- [ ] Confirm only `.env.example` templates are present in the project; keep real `.env` files out of source control.
- [ ] Check that copied backend credentials are replaced with private values, not the example placeholders.
- [ ] Confirm root and backend `.gitignore` behavior in the actual repository/CI system. The workspace checked for this report is not a Git repository.
- [ ] Do not treat generated directories such as `frontend/node_modules`, `frontend/dist`, or `backend/target` as source.

### 2. Frontend installation and UI

Run in PowerShell from the repository root:

```powershell
Set-Location .\frontend
npm ci
npm run lint
npm run build
npm run dev
```

- [ ] Confirm `npm ci`, type-check, and build succeed on the machine/CI that will host the project.
- [ ] Visit `http://localhost:3000`; confirm the dashboard renders without console or network errors.
- [ ] Manually open dashboard, crop recommendations, disease, market, planner, waste-to-wealth, schemes, buyers, assistant, profile, login/register, and methodology screens.
- [ ] Exercise mobile-width layout, navigation, modal open/close, keyboard navigation, and language switching (English, Marathi, Hindi).
- [ ] Edit a profile, save a business plan, change language, reload the page, and verify the expected browser-local persistence.
- [ ] Reset demo data and verify the resulting state. Do not assume browser `localStorage` is account- or device-synchronized.
- [ ] Confirm forms reject invalid input and communicate errors clearly.
- [ ] Check image upload, leaf-preview, and disease-result UX; the “analysis” is simulated and must not be relied on for diagnosis.
- [ ] Review visual accessibility: contrast, focus visibility/order, labels, screen-reader names, reduced motion, text resizing, and touch-target sizes.
- [ ] Treat crop, mandi, disease, scheme, buyer, and assistant answers as demo content unless independently verified; the current UI does not fetch live sources.

### 3. Backend runtime and database

The Maven project is `backend/pom.xml`. From the repository root, use a separate terminal from the frontend:

```powershell
if (!(Test-Path .\backend\.env)) { Copy-Item .\backend\.env.example .\backend\.env }
notepad .\backend\.env
```

Set `DB_PASSWORD` and generate a strong random `JWT_SECRET` of at least 32 bytes. Load the values into the current PowerShell process, set the installed Java 25 `JAVA_HOME`, and verify Maven's runtime before launching:

```powershell
Get-Content .\backend\.env | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}
$env:JAVA_HOME = 'C:\Users\manth\.jdks\openjdk-25.0.1'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
java -version
mvn -version
```

- [ ] Confirm the Java and Maven versions shown here; Maven must run on JDK 25.
- [ ] Confirm local private `.env` files are excluded from Git/CI artifacts.
- [ ] If Docker Compose is installed, start PostgreSQL from the root:

  ```powershell
  docker compose --env-file .\backend\.env -f .\backend\compose.yaml up -d postgres
  docker compose --env-file .\backend\.env -f .\backend\compose.yaml ps
  ```

- [ ] Confirm PostgreSQL reports healthy and accepts the configured database/user/password.
- [ ] Start the backend from the root with `mvn -f .\backend\pom.xml spring-boot:run`.
- [ ] Confirm Flyway applies migrations V1–V4 against a clean local database.
- [ ] Verify the persistence schema, rollback/backup plan, database restart, and handling of invalid credentials.
- [ ] Probe `http://localhost:8080/actuator/health` if the application starts.
- [ ] Run backend checks from the root: `mvn -f .\backend\pom.xml clean test`.
- [ ] Add real Java tests: currently the test source tree is absent, so a successful test lifecycle is not evidence of business logic coverage.

### 4. API and frontend/backend boundary

- [ ] Confirm there are still no application `@RestController` endpoints; current DTOs/services are not an API contract.
- [ ] Confirm `/v3/api-docs`, Swagger UI, and Actuator availability/authentication match the deployment security policy.
- [ ] Do not expect frontend login, registration, OTP, saved plans, or profile data to be persisted by Java; the interface is not integrated with backend endpoints.
- [ ] Before connecting the frontend, define and test endpoint paths, request/response schemas, authentication, authorization, error handling, pagination, CORS, and API versioning.
- [ ] Configure production `CORS_ALLOWED_ORIGINS` to the actual trusted frontend origin, not a wildcard.
- [ ] Decide which layer owns authentication/session state; do not assume frontend sample flows imply backend account support.
- [ ] Validate all OpenAPI operations against implemented controller behavior once controllers exist.

### 5. Security and secrets

- [ ] Keep `DB_PASSWORD`, `JWT_SECRET`, and future API keys out of source, logs, screenshots, client-side bundles, and public CI artifacts.
- [ ] Replace placeholder secrets before starting the database/backend. Never deploy example credentials.
- [ ] Verify production JWT rotation, expiry, issuer/audience validation, key storage, and revocation strategy.
- [ ] **Critical before real OTP use:** `AuthService` currently returns fixed demo OTP `123456`; do not expose or deploy this path as real authentication. Replace with a real OTP provider, expiry, attempt limits, replay protection, rate limiting, and monitoring before making an OTP endpoint public.
- [ ] Verify authentication/authorization rules with tests, including anonymous access, farmer-vs-admin access, expired/invalid JWTs, and account disablement.
- [ ] Review upload size/content validation and image storage policy before accepting real farmer uploads.
- [ ] Run dependency audits in CI and repeat both npm and Java scans when dependencies change. The recorded Java scan was for direct dependencies; it is not a complete code/security audit.

### 6. Data, AI, and product claims

- [ ] Identify visible demo/sample content and make its non-live status obvious to users.
- [ ] Validate agricultural recommendations, prices, schemes, buyer listings, and yield/profit claims with qualified/current sources before operational use.
- [ ] Confirm there is no trained Python model or ML service yet; UI disease/crop/assistant functions currently simulate or derive results locally.
- [ ] Before using real farmer data, establish consent, privacy notice, retention/deletion policy, access control, encryption, and incident response.
- [ ] Define the Python service's authentication, payload/data minimization, timeouts, retries, failure behavior, model versioning, and health checks before implementation.
- [ ] Do not expose `GEMINI_API_KEY` through frontend `VITE_*` variables; the current frontend does not consume the root hosting variables.

### 7. Deployment and operations

- [ ] Verify production frontend build, hosting base path, SPA fallback, HTTPS, cache policy, and PWA manifest/icon paths on the actual host.
- [ ] Build/run backend in a clean deployment image using Java 25, with external secrets and database configuration.
- [ ] Decide how database migrations are applied, backed up, monitored, and rolled back.
- [ ] Check readiness/liveness, logs with sensitive-data redaction, metrics exposure, alerting, and shutdown behavior.
- [ ] Verify production CORS, reverse-proxy headers, TLS, allowed actuator endpoints, and network exposure.
- [ ] Document deployment-specific environment variables and recovery steps.

## Important known risks / gaps

1. **No end-to-end application API:** frontend and backend are separate today; there are no business REST controllers and no HTTP requests from the frontend.
2. **No automated Java tests:** backend test dependencies exist but no test source files were found. Add tests before relying on backend behavior.
3. **Demo-only intelligence:** disease analysis, assistant responses, crop recommendation, and bundled data are not live model/data integrations.
4. **Fixed demo OTP:** `123456` is hard-coded in `AuthService`; it is not suitable for real authentication.
5. **Database startup unverified:** Docker is unavailable in the checked environment; migrations and database connection need local validation.
6. **Machine-specific Java selection:** the default shell was observed using Java 21, but the backend target is 25. Confirm `mvn -version` in every developer/CI environment.
7. **Source control unavailable:** this workspace is not a Git repository, so the final set of changed files, ignored files, and commit contents still needs review in the real repository.

## Useful commands

Run from the repository root unless the command first changes into `frontend/`:

```powershell
# Frontend
Set-Location .\frontend
npm ci
npm run lint
npm run build
npm run dev

# Backend (in another PowerShell terminal at the repository root)
mvn -f .\backend\pom.xml clean test
mvn -f .\backend\pom.xml spring-boot:run
```

The checked environment's frontend verification and Java 25 compile/test lifecycle passed; Java tests, database runtime checks, and browser-based checks remain to be added or performed as noted above.

## Environment setup and verification run — 2026-10-19 17:02 IST

This section records the latest direct environment checks. `PASS` means the command or behavior was actually executed successfully. `BLOCKED` means a required local prerequisite was unavailable. `NOT IMPLEMENTED` means the application behavior itself does not exist.

### Tools and prerequisites

| Check | Status | Actual result |
| --- | --- | --- |
| `java -version` from the default shell | **PASS** | Exit 0; OpenJDK Temurin 21.0.12.1 (LTS) |
| `javac -version` from the default shell | **PASS** | Exit 0; javac 21.0.12.1 |
| `mvn -version` from the default shell | **PASS** | Exit 0; Maven 3.9.16 running on Java 21.0.12.1 |
| JDK 25 availability | **PASS** | JDK 25.0.1 exists at `C:\Users\manth\.jdks\openjdk-25.0.1`; selected explicitly for backend checks |
| `node --version` / `npm --version` | **PASS** | Exit 0; Node v24.13.1, npm 11.8.0 |
| `git --version` | **PASS** | Exit 0; Git 2.50.1.windows.1 |
| `git status --short --branch` | **BLOCKED** | Exit 128: workspace is not inside a Git repository; no status/diff can be obtained |
| `docker --version` / `docker compose version` | **BLOCKED** | `docker` executable is not on PATH |
| `docker info` / Docker daemon | **BLOCKED** | Cannot run because Docker CLI is missing |
| Maven Wrapper (`mvnw.cmd`, `.mvn/wrapper`) | **BLOCKED** | No wrapper files found; used installed Maven 3.9.16 |
| Local `.env` files | **BLOCKED** | No root, backend, or frontend `.env` exists; templates exist. Did not generate secret values or overwrite/create local credentials. |

### Commands run and results

| Command / working directory | Status | Exit code / result |
| --- | --- | --- |
| `npm ci` — `frontend/` | **PASS** | Exit 0; installed 61 packages from `package-lock.json`; 0 audit vulnerabilities reported during install |
| `npm run lint` — `frontend/` | **PASS** | Exit 0; `tsc --noEmit` |
| `npm run build` — `frontend/` | **PASS** | Exit 0; Vite 8.3.4 production build generated |
| `npm audit` — `frontend/` | **PASS** | Exit 0; 0 vulnerabilities |
| `npm run dev -- --host 127.0.0.1` — `frontend/` | **PASS** | Vite 8.3.4 started; reported `http://127.0.0.1:3000/`; server was left running (PID 5532 at verification) |
| `Invoke-WebRequest http://127.0.0.1:3000/` | **PASS** | Exit 0; HTTP 200 and expected Vite/FarmVerse HTML entry/title |
| `npm ci --ignore-scripts --dry-run` — `frontend/` | **PASS** | Exit 0; lockfile installation dry-run reported up to date |
| `JAVA_HOME=C:\Users\manth\.jdks\openjdk-25.0.1; mvn clean test-compile -q` — `backend/` | **PASS** | Exit 0; Java 25 main/test compilation |
| `JAVA_HOME=C:\Users\manth\.jdks\openjdk-25.0.1; mvn clean test -q` — `backend/` | **PASS, NO TESTS** | Exit 0; no `backend/src/test` tree and no Surefire reports, so zero Java tests were exercised |
| Two Maven `clean` commands launched concurrently | **FAIL (retry passed)** | First `test-compile` attempt exit 1 because simultaneous Maven clean runs contended over `backend/target/classes`. Reran the clean compile and test commands sequentially; both exited 0. Do not run builds concurrently against the same Maven `target/`. |
| `mvn -f .\backend\pom.xml spring-boot:run` | **BLOCKED — NOT RUN** | PostgreSQL prerequisite is unavailable: Docker missing, port 5432 not listening, and no configured local `backend/.env`. Avoided a misleading startup attempt without its database/configuration. |
| `GET http://localhost:8080/actuator/health` | **BLOCKED — NOT RUN** | Backend did not start; health endpoint cannot be evaluated |
| PostgreSQL Compose startup, Flyway migration, database read/write | **BLOCKED — NOT RUN** | Docker CLI/daemon unavailable; no PostgreSQL process listening on port 5432 |
| Browser rendering / Playwright journeys | **NOT RUN** | Vite HTML HTTP response was verified, but no real browser or Playwright run was performed; visual, interaction, mobile, and accessibility behavior remain unverified |

### Configuration and functionality confirmed

- **Frontend:** React 19 + TypeScript 7 + Vite 8, npm package manager and npm lockfile. No frontend environment variable is required to run the current development build. Root AI Studio `GEMINI_API_KEY` and `APP_URL` templates are not consumed by current frontend source.
- **Backend:** Maven Spring Boot 3.5.16, Java/compiler source and target 25, Maven 3.9.16. There is no Maven Wrapper.
- **Database:** Compose declares PostgreSQL `16-alpine`, container `farmverse-postgres`, database default `farmverse_db`, and port default `5432`. The Compose service requires `DB_PASSWORD`; Spring configuration also requires `JWT_SECRET`. Never use the example placeholders as production secrets.
- **Migrations:** Four Flyway migrations are present (V1–V4); none were executed in this environment because PostgreSQL is unavailable.
- **Backend packages:** `common`, `config`, `dto`, `entity`, `exception`, `repository`, `security`, and `service` exist. There are no application REST controllers.
- **Frontend/backend integration:** No frontend HTTP request client/calls were found. Frontend services use browser `localStorage`, bundled data, and simulated delays/results. Business API integration and database persistence through the UI are **NOT IMPLEMENTED**.
- **Authentication and demo boundaries:** Frontend login/OTP flows locally create a demo farmer profile without calling the backend. The backend service returns and verifies a fixed demonstration OTP (`123456`). Neither flow is production authentication. Do not use them to protect real accounts or data.
- **Dataset/model availability:** Crop recommendations, disease results, assistant responses, and market/scheme catalogs are demo content; no Python service/model or live data feed is implemented. These outputs must not be represented as real diagnoses, current prices, or live predictions.
- **Java security scan:** The earlier direct-dependency scan found pgJDBC CVE-2026-54291 at 42.7.11. The project now pins 42.7.12 and the recorded post-fix direct-dependency scan found no known CVEs. This is not a full application security audit.

### Remaining blockers and exact start commands

**Frontend (verified working; server currently running):**

```powershell
Set-Location 'D:\PROJECTS CODING\FARM-VERSE.ORG01\frontend'
npm ci
npm run dev
```

Open `http://127.0.0.1:3000/` (or `http://localhost:3000/`). Stop this development server with Ctrl+C in its terminal.

**Backend (compile/tests verified on Java 25; application/database startup blocked here):** install/start Docker Desktop or another compatible Docker runtime, create `backend/.env` from `backend/.env.example`, replace `DB_PASSWORD` and `JWT_SECRET` with private values, then run from the repository root:

```powershell
Set-Location 'D:\PROJECTS CODING\FARM-VERSE.ORG01'
docker compose --env-file .\backend\.env -f .\backend\compose.yaml up -d postgres
$env:JAVA_HOME = 'C:\Users\manth\.jdks\openjdk-25.0.1'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
mvn -f .\backend\pom.xml spring-boot:run
```

Confirm `mvn -version` reports Java 25 before the last command. The checked environment defaulted to Java 21, so set `JAVA_HOME` as above (or to the actual JDK 25 installation path on that machine). The backend does not expose business endpoints yet; a database container and healthy process alone will not make frontend-to-backend integration functional.
