# API reference and integration status

## Application API

There are currently no application REST controllers in `backend/src/main/java`; therefore there are no business API routes or request/response contracts available for the frontend to call. The DTOs and services in the backend are internal building blocks, not a published or working API.

The frontend's `frontend/src/services/apiService.ts` module is a browser-side service for local storage and deterministic demo calculations. It does not issue HTTP requests. Do not infer API availability from its name.

## Configured backend endpoints

The Spring Boot project configures Actuator health and Springdoc paths:

- `GET /actuator/health` — Actuator health endpoint.
- `/v3/api-docs` — configured OpenAPI document path; no business operations are currently registered.
- `/swagger-ui.html` — configured Swagger UI path; it does not imply that business endpoints exist.

The backend base URL defaults to `http://localhost:8080`. Authentication, business endpoints, and frontend-to-backend integration require implementation before they form a usable API contract.
