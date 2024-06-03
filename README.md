# Zenith

## Introduction

Zenith is your ultimate productivity management app. Whether you're looking to organize your tasks, collaborate on projects, or keep track of important dates, Zenith has got you covered.

## Key Features

- **User Accounts:** Register, log in, and reset your password to secure your personal productivity data.
- **Email Activation:** Sign up with Zenith's email verification ensuring a spam-free experience.
- **Home:** Get an overview of your notifications and stay updated on all your activities.
- **Notes:** Write markdown notes, share them with other users, and print them to PDF or directly to a printer.
- **Calendar:** Add events, filter them and manage your schedule efficiently.
- **To-Do Lists:** Keep track of tasks with separate views for the completed and undone ones.
- **Projects:** Create projects with Kanban boards, track progress percentages, and manage tasks.
- **Group Support:** Collaborate on projects with role based privileges such as admin, moderator, and user.
- **Settings:** Customize your app experience with various options:
  - Choose from four main colors: blue, red, green, and purple.
  - Toggle between black and white background themes.
  - Switch between Polish and English languages.
  - Manage notifications for calendar events and project activities.
  - Set reminders for 3 days before, 1 day before, or none.
  - Customize sidebar routes.
- **Account Management:** Easily delete and update your account if needed.

## Project Structure

```bash
project-root/
│
├── frontend/ # Frontend
│ ├── src/ # React source code
│ ├── src-tauri/ # Tauri (rust) source code
│ └── ...
│
├── backend/ # .NET Backend
│ ├── src/ # Source code
│ └── ...
│
├── README.md # This file
└── ...
```

## Running the Project

### Frontend (Tauri)

1. Navigate to the `frontend/` directory.
2. Open a terminal.
3. Run `pnpm install` to install dependencies.
4. To run the desktop application, execute `pnpm tauri dev`.
5. To run the web version, execute `pnpm run dev`.

### Backend (.NET)

1. Ensure you have MS SQL Server installed and running.
2. Navigate to the `backend/` directory.
3. Open a terminal.
4. Run `dotnet restore` to install dependencies.
5. Update the database by running `dotnet ef database update`.
6. After installation, start the application with `dotnet run`.

Please note that for both the frontend and backend, you might have to provide your own API keys and configure the `appsettings.json` file with appropriate data.

## Design & Logo

![Thumbnail](https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbnk94WVBXUwbcClxZ8oWS6er8_KUbXGpi_f_LEpAP6TGGS96iUgezCgGwE1oqjDxuqyHcQAz8cVoUd247ByxLnTB3KejZFcvE=w1920-h919-rw-v1)
_Thumbnail_

[Design](https://www.figma.com/design/tWP4svUBCZxPiGxgxh3hcA/Zenith?t=FG236HG1aegHMSVp-0)

## Getting Started

1. **Sign Up or Log In:** Register a new account or log in with your existing credentials.
2. **Home View:** Get a quick overview of your notifications.
3. **Notes View:** Write markdown notes, share them, and print them as needed.
4. **Calendar:** Organize your schedule by adding and filtering events.
5. **To-Do Lists:** Track your tasks and organize them into done and undone.
6. **Projects:** Create and manage projects with Kanban boards. Track progress and collaborate with team members.
7. **Group Support:** Manage project roles and collaborate with multiple users.
8. **Settings:** Customize your experience by choosing colors, themes, languages, and notification preferences.
