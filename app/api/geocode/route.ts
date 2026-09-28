export async function GET(request) {
    const url = new URL(request.url)
    const city = url.searchParams.get("city")
    if (!city) {
        return Response.json({error : "Please provide a city"}, {status : 400})
    }
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    const data = await res.json()
    return Response.json(data.results.map(result => {
        return {
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
            country: result.country
        }
    }))
}