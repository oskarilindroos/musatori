# musatori - 無悟り

> A React/Express Full-Stack online marketplace for music equipment.

Deployed at [https://musatori.onrender.com/](https://musatori.onrender.com/)

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS

### Backend

- Node
- TypeScript
- Express
- Kysely
- Sqlite3

## CI/CD

- When a PR is opened, a GitHub Action verifies the branch by running tests in both the frontend and backend directories. If the tests pass, a Docker image is built (but not pushed to the registry).
- When the PR is merged into `main`, a GitHub Action builds the Docker image and pushes it to the registry. Render then fetches the new image from the registry and deploys it.

## Hosting

- Frontend: Render Web Service
- Backend: Render Web Service
- Database: Lives in the backend container as an .sqlite file
