# Fitness Management System

## Project Overview
This is a full-stack web application designed to streamline the management of fitness club members and their subscriptions. The system provides a robust solution for tracking membership status, calculating expiration dates based on various subscription plans, and securing administrative operations.

## Architecture
The project follows a decoupled architecture, separating the concerns of the data processing layer from the user interface:

* **Backend:** Developed using .NET 8 Web API, following RESTful principles.
* **Database:** SQL Server managed via Entity Framework Core with a Code-First approach.
* **Frontend:** A Single Page Application (SPA) built with React.js and styled with Bootstrap 5.

## Key Features
* **Automated Membership Tracking:** The system automatically calculates expiration dates based on selected plans (1, 3, or 12 months) and updates the status (Active/Expired) in real-time.
* **Administrative Security:** Critical operations such as adding, editing, or deleting members are protected by an authentication layer.
* **Dynamic Dashboard:** Provides high-level statistics regarding the total number of members and their current status.
* **Responsive Design:** The interface is fully responsive, ensuring usability across various devices and screen sizes.

## Technical Stack
* **Server-side:** C#, ASP.NET Core Web API, Entity Framework Core.
* **Client-side:** React, Axios for API communication, React Router for navigation.
* **Tools:** Git, Visual Studio, VS Code, SQL Server Management Studio.

## Project Structure
* **/backend:** Contains the .NET source code, including Controllers, Models, Data Context, and Migrations.
* **/frontend:** Contains the React application source code and configuration files.
* **/screenshots:** Documentation of the application's interface and functionality.

## Local Setup and Installation

### Backend Configuration
1. Navigate to the `/backend` directory.
2. Update the ConnectionString in `appsettings.json` to point to your local SQL Server instance.
3. Open the Package Manager Console and run: `Update-Database`.
4. Start the server using: `dotnet run`.

### Frontend Configuration
1. Navigate to the `/frontend` directory.
2. Install the necessary dependencies by running: `npm install`.
3. Launch the application in development mode with: `npm run dev`.

## Security and Validation
The application implements client-side route protection and server-side authorization checks to ensure that only authenticated administrators can modify the database. Data integrity is maintained through model validation on both the frontend and backend layers.