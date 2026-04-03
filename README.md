# Project Title

Collaborative Weekly Report Management System. 

# Problem Statement
Educational Institutions prepare weekly reports of Departments manually by collecting data from multiple faculty
members across 17 structured sections. This leads to delays, inconsistencies, missed
entries, and increased manual effort for coordinators.

## Features

- Faculty signup and login (stored in browser localStorage)
- Dashboard with 17 reporting sections
- Dynamic row-based data entry for each section
- Save full report data to JSON via backend API
- Generate a consolidated weekly report view
- Download/print report as PDF (browser print)
- Download report content as DOC file

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Storage: JSON file (`database/db.json`)

## Project Structure

```text
BuildSphere/
  backend/
    server.js
    package.json
  frontend/
    index.html
    signup.html
    dashboard.html
    report.html
    script.js
    report.js
    style.css
  database/
    db.json
  README.md
```

## Weekly Report Sections

The dashboard supports the following 17 sections:

1. General Points
2. Faculty Joined
3. Faculty Achievements
4. Student Achievements
5. Department Achievements
6. Faculty Events
7. Student Events
8. Non Technical Events
9. Industry Visits
10. Hackathons
11. Faculty FDP
12. Faculty Visits
13. Patents
14. VEDIC Programs
15. Placements
16. MoUs
17. Skill Development

## Prerequisites

- Node.js 16+ (recommended: latest LTS)
- npm
- A modern browser (Chrome/Edge/Firefox)

## Setup and Run

### 1) Install backend dependencies

```bash
cd backend
npm install
```

### 2) Start backend server

```bash
npm start
```

Backend runs on:

- `http://localhost:3000`

### 3) Open frontend

Open `frontend/index.html` in your browser.

Recommended local flow:

1. Register user in `signup.html`
2. Login via `index.html`
3. Fill entries in `dashboard.html`
4. Choose week date
5. Click `Save Data`
6. Click `Generate Report`
7. Download as PDF/DOC from report page

## Backend API

Base URL: `http://localhost:3000`

### GET `/get`

Returns complete report JSON from `database/db.json`.

Example response:

```json
{
  "general": [],
  "faculty_join": [],
  "faculty_ach": []
}
```

### POST `/save`

Saves full report payload to `database/db.json`.

Example request body:

```json
{
  "general": [
    { "Description": "Department meeting conducted" }
  ],
  "faculty_join": [
    {
      "Name": "Dr. A",
      "Dept": "CSE",
      "Designation": "Assistant Professor",
      "Date": "2026-03-25"
    }
  ]
}
```

Success response:

- `"Saved successfully"`

## Data Model

The persisted file is a JSON object keyed by section IDs:

- `general`
- `faculty_join`
- `faculty_ach`
- `student_ach`
- `dept_ach`
- `faculty_events`
- `student_events`
- `nontech_events`
- `visits`
- `hackathons`
- `fdp`
- `faculty_visits`
- `patents`
- `vedic`
- `placements`
- `mou`
- `skill`

Each key stores an array of row objects from the dashboard inputs.

## Notes and Limitations

- Authentication is client-side only (localStorage), suitable for demo/internal use.
- Passwords are not encrypted.
- No validation for duplicate users or empty fields.
- Backend uses sync file operations in `server.js` (simple but not optimized for scale).
- CORS is enabled for local frontend-backend access.
- Ensure backend is running before opening report generation features.

## Troubleshooting

- If save/get fails, verify backend is running on port `3000`.
- If report is blank, ensure data was saved at least once.
- If PDF layout looks different, check browser print settings (margins/scale).
- If DOC file opens with formatting issues, use Word compatibility mode.

## Future Improvements

- Replace localStorage auth with secure backend auth
- Hash passwords and add user roles
- Add form validation and edit/delete row actions
- Add database integration (MongoDB/PostgreSQL)
- Add export templates and branding customization
- Add automated tests and deployment setup

## License

This project currently has no explicit license. Add one before public distribution.
