# Chocolate Haven - E-Commerce Admin Portal

A React-based e-commerce platform for managing and browsing a chocolate product catalog.

## Setup

**Prerequisites:** Node.js installed

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start the JSON server (mock backend):
```bash
npm run server
```

3. In a separate terminal, start the development server:
```bash
npm run dev
```

4. Run the test suite:
```bash
npm test
```

The app runs on `http://localhost:5173` and the API on `http://localhost:3001`.

## Features

- **Home** — Store landing page with hero section and about blurb
- **Shop** — Browse all available chocolate products
- **Admin Portal** — Password-protected (`admin`) dashboard with:
  - Add new products
  - Edit existing products
  - Delete products
- **Client-side routing** — Seamless navigation between pages
- **Global state** — Product data managed via React Context
- **Custom hook** — `useFetch` handles all API requests

## Known Limitations

- Authentication is a simple password check (`admin`) — not suitable for production
- No search or filter functionality on the shop page
- No form validation beyond password checking
- Data is not persisted beyond the local `db.json` file
