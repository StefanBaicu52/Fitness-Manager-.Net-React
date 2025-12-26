# Fitness Management System

## Project Overview
This is a professional full-stack web application designed for the comprehensive management of fitness club operations. The system automates member tracking, subscription lifecycle management, and administrative security, providing a streamlined experience for club owners and staff.

## Architecture and Design
The application is built using a modern decoupled architecture:

* **Backend:** Developed with ASP.NET Core 8 Web API, implementing a clean separation of concerns through Controllers, Data Transfer Objects (DTOs), and Repository patterns.
* **Frontend:** A Single Page Application (SPA) built with React.js, utilizing hooks for state management and Axios for asynchronous API communication.
* **Database:** Microsoft SQL Server, managed using Entity Framework Core with Code-First migrations for consistent schema deployment.

## Key Features
* **Member Lifecycle Management:** Complete CRUD (Create, Read, Update, Delete) operations for managing member profiles and contact information.
* **Automated Subscription Logic:** Intelligent calculation of membership expiration dates based on tiered plans (1, 3, or 12 months), with real-time status updates (Active/Expired).
* **JWT Security Framework:** Implementation of JSON Web Tokens for stateless authentication. This ensures that administrative actions are strictly reserved for authorized users.
* **Adaptive User Interface:** The frontend dynamically adjusts based on authentication status, hiding or showing management tools to prevent unauthorized interaction.
* **Data Analytics Dashboard:** Integrated statistics module providing instant visibility into total membership count and current club capacity.

## Technical Stack
* **Server-side:** C#, .NET 8, ASP.NET Core Web API, Entity Framework Core.
* **Client-side:** React.js, React Router, Axios, Bootstrap 5.
* **Security:** JWT Authentication, Password Hashing, CORS Policy Management.
* **Tools:** Visual Studio, VS Code, Git, SQL Server Management Studio.

## Project Structure
* **/backend**: The .NET 8 source code, including business logic, database context, and API endpoints.
* **/frontend**: The React application, containing components, routing logic, and global styling.
* **/screenshots**: Visual documentation showcasing the dashboard, member management interface, and security modules.

## Security and Data Integrity
The system employs multiple layers of protection:
* **Server-Side Authorization:** Sensitive API endpoints are protected by JWT validation, rejecting any request that does not include a valid bearer token.
* **Client-Side Route Guards:** Private routes in React prevent unauthenticated users from accessing administrative pages.
* **Input Validation:** Strict data validation on both layers ensures that only properly formatted information is persisted to the database.

## Local Installation and Setup

### Backend Prerequisites
1.  Navigate to the `/backend` directory.
2.  Locate `appsettings.json` and update the `DefaultConnection` string with your local SQL Server credentials.
3.  Execute `dotnet ef database update` in the terminal to generate the database schema.
4.  Run the application using `dotnet run`.

### Frontend Prerequisites
1.  Navigate to the `/frontend` directory.
2.  Install all required dependencies by executing `npm install`.
3.  Launch the development server with `npm run dev`.
4.  Access the application via the provided local URL (typically http://localhost:5173).

---
*Developed as a full-stack portfolio project to demonstrate proficiency in modern web development practices and secure API design.*