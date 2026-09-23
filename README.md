# Weather App

A beginner-friendly full-stack project built with Next.js and the [Open-Meteo](https://open-meteo.com/) API (free, no API key required).

## Requirements

- [ ] Set a location
- [ ] Show today's weather range + current weather
- [ ] Show next 3 days' weather range + summary
- [ ] (Optional) Show expected rain + humidity

## Build Steps

Tackle these one at a time. Each step should leave you with something runnable before moving to the next.

### 1. Set up Open-Meteo
- No API key needed — just test the endpoints directly in your browser first so you know what the response JSON looks like.
- Geocoding endpoint: `https://geocoding-api.open-meteo.com/v1/search?name={city}`
- Weather endpoint: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`

### 2. Build a location input
- Add a controlled text input + submit button for the user to type a city name.
- Store the location in React state (`useState`) on submit — no geolocation or autocomplete yet.

### 3. Geocode the location to coordinates
- Create a Next.js API route (e.g. `/api/geocode`) that calls Open-Meteo's geocoding endpoint and returns `{ latitude, longitude }` for the typed city.
- Doing this server-side (rather than fetching directly from the browser) is good practice, even though Open-Meteo doesn't require a key.

### 4. Fetch and display today's weather
- Create a second API route (e.g. `/api/weather`) that takes coordinates and calls the forecast endpoint.
- Render a card showing: current temperature, condition, and today's high/low.
- Get this fully working end-to-end before moving on — it's the core loop of the app.

### 5. Add the 3-day forecast
- Extend the `/api/weather` route to include the `daily` forecast fields.
- Map over the next 3 days and render one small card per day: date, high/low, and a short summary.

### 6. Add loading and error states
- Show a loading indicator while the fetch is in flight.
- Show a friendly error message if the location isn't found or the API call fails.

### 7. (Optional) Add rain chance and humidity
- Add `precipitation_probability_max` and `relative_humidity_2m` (or similar) to the `daily`/`hourly` params.
- Display them alongside the existing current/forecast cards.

### 8. Polish: remember last location
- Store the last-searched location in `localStorage` and pre-fill it on page reload.
- Introduces `useEffect` and browser storage.

## Notes

- Open-Meteo docs: https://open-meteo.com/en/docs
- Weather codes (for translating `weathercode` into readable text) are listed in the Open-Meteo docs under "WMO Weather interpretation codes".



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
