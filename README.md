# musatori

> A React/Express Full-Stack online marketplace for music equipment.

Live at [https://musatori-webapp-static.onrender.com/](https://musatori-webapp-static.onrender.com/)

### Tech Stack

#### Frontend

- React
- TypeScript
- Material-UI

#### Backend

- Node
- TypeScript
- Express
- Sqlite3

### Running locally

(Requires Node.js v20.12.2 and npm)

1. Clone the repository
2. Run `npm install` in both the frontend and backend directories
3. Run `npm run dev` in the backend directory
4. Run `npm run dev` in the frontend directory
5. The should be available on your browser at http://localhost:8080

### CI/CD

- When a PR is opened, a GitHub Action verifies the branch by running tests in both the frontend and backend directories. If the tests pass, Docker images are built (but not pushed to the registry).
- When the PR is merged into `main`, a GitHub Action builds the Docker images and pushes them to the registry. Render then fetches the new images from the registry and deploys them to their own Web Service. **Note that currently the frontend Web Service is not working (container couldn't connect to the backend for some reason), so the frontend is deployed as a static site instead.**

### Hosting

- Frontend: Render Static Site (for now, as the Web Service is not working)
- Backend: Render Web Service
- Database: Lives in the backend container as an .sqlite file

## Project summary

This project was a lot of fun to work on, I only wish I wasn't so lazy and started earlier so I could have implemented more non mandatory features like search, drag and drop images etc. I decided to use TypeScript for both the frontend and backend just to get more practice with it.

The backend was designed with the familiar MVC pattern in mind. The backend is split into controllers, services and repositories. The controllers handle the routing and request/response handling, the services handle the business logic and the repositories handle the database interactions.

The frontend visuals were built using Material-UI components. I created a custom theme to match the color scheme of my text editor. I also decided to use react-query this time around to handle the data fetching and caching instead of creating my own custom hooks. I grew to like it a lot. If I had more time I would have used Tailwind CSS to style the components instead of Material-UI's built in styling as I enjoy creating UI designs in Figma. I also would have separated the fetching logic away from the components as I like to keep components as clean as possible.

In regards to the project requirements, I implemented all the mandatory features, except for editing existing listings. Also I didn't have time to write any tests for the frontend.

### Features implemented

- [x] User authentication
- [x] User can create listings
- [x] User can view their own listings
- [x] User can view details of a listing
- [x] User can delete their own listings
- [x] User can view all listings

### Features not implemented

Check [issues](https://github.com/oskarilindroos/musatori-webapp/issues) for more details.

### Challenges

- Had a lot of trouble with CORS as per usual.
- Leaving so little time for the project that I had to write the entire frontend in ~2 days wasn't the smartest decision 😅.
- Was a bit rusty with TypeScript and had to look up a lot of things.
- Setting up Typescript on the backend was painful. It served as a reminder of why the Javascript ecosystem can be a pain, especially after having recently written a backend in Go.
- Proper error handling is always a challenge.
- Had trouble with the frontend not being able to connect to the backend when deployed on Render as a container. I ended up running out of time to troubleshoot and chose to deploy the frontend as a static site instead (which runs better as a free plan on Render anyway).
