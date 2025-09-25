# AI Planner

AI Planner is a web application that generates **smart travel itineraries** using artificial intelligence.

The project is built with:
- **React** for the frontend
- **Tailwind CSS** for styling
- **FastAPI** (planned) for the backend API that provides AI-powered itinerary generation.

---

## Features
- User-friendly form to capture:
  - Start and end dates of the trip
  - Personal interests (comma separated)
  - Desired daily activity hours
  - Preferred travel pace (slow / moderate / fast)
- Sends data to a backend endpoint (`/api/generate`) to get an AI-generated itinerary.
- Displays the itinerary by day, including optional extra activities.

---

## Project Structure
ai-planner/
├─ src/
│ ├─ api/ # (to be added) API call helpers
│ ├─ components/ # Reusable UI components
│ ├─ context/ # Global state (itinerary context)
│ ├─ pages/ # Home & Results pages
│ ├─ App.js
│ ├─ index.css # Tailwind directives
│ └─ index.js
├─ public/
├─ package.json
└─ tailwind.config.js



## Prerequisites
- **Node.js** ≥ 16
- **npm** ≥ 8

Check versions:
```bash
node -v
npm -v
Installation
Clone the repository and install dependencies:


git clone <your-repo-url>
cd ai-planner
npm install
Development
Run the development server:


npm start
Open http://localhost:3000 to view in the browser.

The page reloads automatically when you make edits.

Tailwind CSS Setup
The project uses Tailwind for styling.
Key files:

tailwind.config.js includes content: ["./src/**/*.{js,jsx,ts,tsx}"].

src/index.css contains:


@tailwind base;
@tailwind components;
@tailwind utilities;
src/index.js imports index.css.

Backend API (Planned)
The frontend expects a FastAPI backend running on:


http://localhost:8000/api/generate
which returns JSON in this format:


{
  "itinerary": {
    "days": [
      {
        "date": "YYYY-MM-DD",
        "items": [
          {"name": "Place", "category": "Category", "duration_mins": 120}
        ]
      }
    ],
    "extras": [
      {"id": 1, "name": "Optional Place", "category": "Category"}
    ]
  }
}

Deployment
You can deploy the frontend separately on Vercel or Netlify.
Make sure to set an environment variable for the backend API URL.

License
This project is released under the MIT License.
See the LICENSE file for details.

Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

