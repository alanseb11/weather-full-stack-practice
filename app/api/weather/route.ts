import { fetchWeatherApi } from "openmeteo";

export async function GET(request) {
    const url = new URL(request.url)
    const longitude = url.searchParams.get("longitude")
    const latitude = url.searchParams.get("latitude")
    if (!longitude||!latitude) {
        return Response.json({error : "Please provide a longitude and latitude"}, {status : 400})
    }
    const params = {
	    latitude,
	    longitude,
	    current: 'temperature_2m,weather_code',
        hourly: 'temperature_2m,precipitation',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min'
    };
    const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const response = responses[0]
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const hourlytimes = range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            )
    const hourlytemperature =hourly.variables(0)!.valuesArray()!
    const hourlyprecipitation = hourly.variables(1)!.valuesArray()!
    const dailytimes = range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            )
    const dailyWeatherCode = daily.variables(0)!.valuesArray()!
    const dailytemperatureMax = daily.variables(1)!.valuesArray()!
    const dailytemperatureMin =daily.variables(2)!.valuesArray()!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: current.variables(0)!.value(), // Current is only 1 value, therefore `.value()`
            weatherCode: current.variables(1)!.value(),
        },
        hourly:Array.from({length:hourlytimes.length},(v, k) => k).map(i => ({
            time:hourlytimes[i],
            temperature:hourlytemperature[i],
            precipitation:hourlyprecipitation[i]
        })),
        daily:Array.from({length:dailytimes.length},(v, k) => k).map(i => ({
            time: dailytimes[i],
            weatherCode: dailyWeatherCode[i],
            temperatureMax: dailytemperatureMax[i],
            temperatureMin: dailytemperatureMin[i]

        }))
    };
    return Response.json(weatherData)
}
