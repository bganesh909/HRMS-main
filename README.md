# HRMS (CoreVolt)

A full-stack HR management system with a Django REST backend and a React (Vite) frontend.

## Structure
- `corevoltbackend/`: Django project (API, auth, attendance, employees, etc.)
- `voltcore/`: React (Vite) frontend app

## Prerequisites
- Python 3.10+
- Node.js 18+
- npm 9+ (or yarn/pnpm)

## Backend - Django
1. Create and activate a virtual environment
   ```bash
   cd corevoltbackend
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```
3. Apply migrations and run server
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
4. Useful commands
   - Create superuser: `python manage.py createsuperuser`
   - Load 2025 holidays (from `holidays2025.csv`): `python manage.py import_holidays`
   - Sync group permissions: `python manage.py group_permissions`

API base url: `http://127.0.0.1:8000/`

## Frontend - React (Vite)
1. Install dependencies
   ```bash
   cd voltcore
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```

The app will be available at the URL shown in the terminal (typically `http://127.0.0.1:5173/`).

## Environment Variables
- Backend: configure Django settings via environment variables as needed (e.g., `DEBUG`, DB settings). Defaults point to local `db.sqlite3`.
- Frontend: if the API base URL differs from default, update `src/api/axiosConfig.js` or relevant env configuration.

## Git
Initial commit instructions (if needed):
```bash
git add .
git commit -m "Initial commit"
```

## Notes
- Media uploads are stored under `corevoltbackend/media/` by default.
- Ensure CORS and auth settings match your deployment needs.
