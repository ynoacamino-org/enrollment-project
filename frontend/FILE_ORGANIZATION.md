# Frontend Architecture: Screaming Architecture

This document outlines the frontend's architecture, which is based on the principles of **Screaming Architecture**.

## Core Principle

We have directories that represent the actual features of our application, such as `auth/`, `dashboard/`, and `landing/`. This makes the codebase easier to understand, navigate, and maintain.

## Directory Structure (`src/`)

The `src/` directory is the root of our frontend codebase. Here's a breakdown of its main components:

### `modules/`

It contains all the business logic, organized by feature. Each subdirectory in `modules/` is a self-contained feature or domain.

-   **Feature Modules (e.g., `auth/`, `dashboard/`, `landing/`)**: Each module encapsulates everything related to a specific feature, including its components, services, types, and business logic. This modular approach promotes separation of concerns and makes features easier to work on in isolation.
-   **`core/` Module**: This is a special, shared module. It contains code that is used across multiple feature modules, such as reusable UI components (`ui/`), base layouts (`layouts/`), and global utilities (`lib/`).

### `pages/`

This directory is required by the Astro framework to handle routing. The file structure inside `pages/` maps directly to the application's URL routes.

Pages should be lightweight. Their primary responsibility is to compose layouts and components from the `modules/` directory to build a view. They should not contain significant business logic.

### `actions/`

This directory holds server-side actions, a feature of the Astro framework. These actions are used for handling form submissions and other client-server interactions securely.

### `assets/`

This directory stores static assets like images and fonts that are used throughout the application.

### `styles/`

This directory contains global stylesheets, including Tailwind CSS setup and any other global styling rules.

## Inside a Feature Module

While the top-level structure screams the application's domain, inside each module, we organize files by their technical role. A typical feature module (e.g., `src/modules/auth/`) might have the following structure:

-   `components/`: React or Astro components specific to this feature.
-   `lib/`: Libraries, constants, and client-side logic.
-   `hooks/`: Custom React hooks related to this feature.
-   `stores/`: State management files, such as Zustand stores or other state-related logic.
-   `ui/`: Reusable UI components that are specific to this feature.
-   `services/`: Code for communicating with external APIs.
-   `types/`: TypeScript type definitions.
-   `layouts/`: Layouts specific to this feature.

This nested structure provides a good balance between a high-level domain-oriented architecture and a low-level, technically organized implementation within each domain.
