# React + Next.js Authentication System with Laravel Sanctum Session-Based Auth

This project is a simple React + Next.js application featuring a session-based authentication system with a Laravel backend. It demonstrates how to set up authentication using React Context, a service layer for API interactions, and conditional client-side routing.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
- [Laravel Sanctum Session-Based Authentication Setup](#laravel-sanctum-session-based-authentication-setup)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Future Improvements](#future-improvements)

---

## Project Overview

This project is built specifically for **Laravel's session-based authentication** system using **Laravel Sanctum**, where the session is managed on the API side. With Laravel Sanctum, sessions are maintained using cookies, and CSRF protection is enforced. This setup is ideal for applications that rely on server-managed sessions rather than client-side tokens (like JWTs).

The frontend integrates with Laravel’s backend to handle:
- **Session-based login and logout**
- **Persistent user sessions across page reloads**
- **Redirects for protected routes**

## Features

- **Login & Logout**: Users can log in and log out using credentials, and the app retains login sessions.
- **Protected Routes**: Routes like the Dashboard are accessible only if the user is authenticated; otherwise, users are redirected to the login page.
- **Error Handling**: Displays error messages for incorrect login details and session timeouts.
- **User State Persistence**: Retains user information across page reloads by checking the session status on each page load.

## Folder Structure

The project is organized as follows:

```plaintext
src/
│
├── app/
│   ├── components/
│   │   └── layout/
│   │       ├── footer.jsx          # Footer component
│   │       └── navbar.jsx          # Navbar component
│   ├── context/
│   │   └── AuthContext.js          # Auth context for managing auth state
│   ├── dashboard/
│   │   └── page.jsx                # Protected dashboard page
│   ├── login/
│   │   └── page.jsx                # Login page
│   ├── services/
│   │   ├── AuthService.js          # Service for login, logout, session checking
│   │   └── axios.js                # Axios instance with CSRF and credentials setup
│
├── public/
│   └── favicon.ico                 # Favicon for the app
├── .env                            # Environment configuration file
├── globals.css                     # Global CSS file
├── layout.js                       # Layout component for the app
└── page.js                         # Main page component