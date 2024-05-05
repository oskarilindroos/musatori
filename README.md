# musatori

> A React/Express Full-Stack online marketplace for music equipment.

Live at [https://musatori-webapp-static.onrender.com/](https://musatori-webapp-static.onrender.com/)

## Tech Stack

### Frontend

- React
- TypeScript
- Material-UI

### Backend

- Node
- TypeScript
- Express
- Sqlite3

## CI/CD

- When a PR is opened, a GitHub Action verifies the branch by running tests in both the frontend and backend directories. If the tests pass, Docker images are built (but not pushed to the registry).
- When the PR is merged into `main`, a GitHub Action builds the Docker images and pushes them to the registry. Render then fetches the new images from the registry and deploys them to their own Web Service. **Note that currently the frontend Web Service is not working (container couldn't connect to the backend for some reason), so the frontend is deployed as a static site instead.**

## Hosting

- Frontend: Render Static Site (for now, as the Web Service is not working)
- Backend: Render Web Service
- Database: Lives in the backend container as an .sqlite file
