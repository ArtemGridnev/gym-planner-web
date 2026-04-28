# Gym Planner

A production-style full-stack workout management app for managing workouts, exercises, and training flows.

Built with React, TypeScript, and modern frontend architecture patterns.

## Live Demo

- [Live app](https://gym-planner-web.vercel.app/)

### Demo credentials

- Email: `demo@gym.com`
- Password: `P@ssw0rd123`

## Features

- Authentication with protected routes using cookie-based sessions.
- Real-time-like UX with optimistic updates.
- Dynamic form system with reusable field components.
- Infinite scrolling with TanStack Query.
- Drag-and-drop exercise management with dnd-kit.

## Tech Stack

### Frontend
- React
- TypeScript
- TanStack Query
- React Hook Form
- MUI (Material UI)
- dnd-kit

### Backend
- NestJS
- PostgreSQL

### Testing
- Cypress for end-to-end tests
- Vitest and React Testing Library for unit and component tests

### Deployment
- Vercel for the frontend
- Railway for the backend

## Architecture

This project follows a scalable, feature-based structure.

- Reusable form system built with configuration-driven fields.
- Clear separation between UI, logic, and API layers.
- Custom hooks for data fetching and business logic.
- Centralized API handling with Axios.
- Modular and extensible component design.

## Work in Progress

The Training Sessions feature is currently under development.

Planned capabilities:
- Automatic session creation from training plans.
- Step-by-step workout flow.
- Progress tracking during sessions.

The rest of the application is fully functional and demonstrates the core architecture and main features.

## Running Locally

### Prerequisites
- Node.js
- npm

### Clone the repository

```bash
git clone https://github.com/ArtemGridnev/gym-planner-web.git
cd gym-planner-web
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
CYPRESS_BASE_URL=http://localhost:5173
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

## Testing

### E2E tests

Cypress E2E tests cover:
- Authentication flow.
- Exercise management.
- Training creation.

### Run tests

```bash
npm run test:e2e
```

## Notes

- Some features are still in progress, especially Training Sessions.
- The app is designed as a showcase of scalable frontend architecture and a modern full-stack workflow.