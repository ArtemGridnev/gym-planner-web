# Gym Planner

## Overview

Gym Planner is a full-stack workout management application for individuals who want to organize their exercise library, build structured recurring training plans, and track scheduled workout sessions.

## Goals

1. Let authenticated users manage a personal exercise library.
2. Let users build named training plans composed of ordered exercises, each with a recurrence schedule.
3. Surface today's scheduled training sessions and guide the user through completing them.

## Core User Flow

1. User signs in.
2. User navigates to Exercises to create and manage their personal exercise library.
3. User navigates to Trainings to create training plans, add exercises, reorder them, and set a recurrence schedule.
4. User navigates to Today's Sessions to see today's scheduled sessions.
5. User starts a session, tracks progress through each exercise, and marks it complete.

## Features

### Authentication

- Email and password registration and login.
- Cookie-based session (`httpOnly`, `withCredentials: true`).
- Protected routes for authenticated users; public routes for login and register.

### Exercise Management

- Full CRUD for exercises.
- Exercises can store workout configuration and metadata.
- Category filtering and text search.
- Exercise detail view in modal.

### Training Plan Management

- Full CRUD for training plans (called "trains" in the codebase).
- Cron-based recurrence schedule per plan.
- Add exercises to a plan via a searchable multi-select modal.
- Reorder exercises within a plan via drag-and-drop.
- Remove individual exercises from a plan.
- Training plan detail view at `/managment/trains/:id`.

### Training Sessions (Microfrontend)

- Automatically surfaces today's scheduled sessions based on plan recurrence.
- Start, track, and complete workout sessions through the remote widget.
- Clicking an exercise in the remote opens the host's exercise detail modal.

## Scope

### In Scope

- User authentication
- Exercise library management
- Training plan management
- Scheduled workout sessions
- Responsive web experience

### Out of Scope

- Social features and workout sharing
- Multi-user collaboration
- AI-generated workout plans
- Subscription and billing functionality
- Native mobile applications
- Push notifications and reminders

## Success Criteria

1. A signed-in user can create, edit, and delete exercises with all fields populated correctly.
2. A signed-in user can create a training plan, assign exercises, reorder them via drag-and-drop, and set a recurrence schedule.
3. Today's scheduled sessions are shown on `/train-sessions` via the training-sessions widget.
