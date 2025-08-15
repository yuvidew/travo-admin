import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";

import { generateTripImages } from "@/lib/get-trips-image";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || ""
});

export async function POST(request: Request) {
    const {
        country,
        duration,
        group_type,
        travel_style,
        interests,
        budget_estimate
    } = await request.json();


    // const response = await generateText({
    //     model: google("gemini-1.5-flash"),
    //     prompt: `Generate a ${duration}-day travel itinerary for ${country} based on the following user information:

    //     Budget: '${budget_estimate}'
    //     Interests: '${interests}'
    //     TravelStyle: '${travel_style}'
    //     GroupType: '${group_type}'

    //     Return only valid JSON (do not include markdown or prose). The output must strictly follow this structure and syntax:

    //     {
    //     "name": "A descriptive title for the trip",
    //     "description": "A brief description of the trip and its highlights not exceeding 100 words",
    //     "estimatedPrice": "Lowest average price for the trip in USD, e.g. $8000",
    //     "duration": ${duration},
    //     "budget": "${budget_estimate}",
    //     "travelStyle": "${travel_style}",
    //     "country": "${country}",
    //     "interests": "${interests}",
    //     "groupType": "${group_type}",
    //     "bestTimeToVisit": [
    //         "🌸 Season (from month to month): reason to visit",
    //         "☀️ Season (from month to month): reason to visit",
    //         "🍁 Season (from month to month): reason to visit",
    //         "❄️ Season (from month to month): reason to visit"
    //     ],
    //     "weatherInfo": [
    //         "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    //         "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    //         "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    //         "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
    //     ],
    //     "location": {
    //         "city": "name of the city or region",
    //         "coordinates": [latitude, longitude],
    //         "openStreetMap": "https://www.openstreetmap.org/#map=6/latitude/longitude"
    //     },
    //     "itinerary": [
    //         {
    //         "day": 1,
    //         "location": "City/Region Name",
    //         "activities": [
    //             {
    //             "time": "Morning",
    //             "description": "🏰 Visit the local historic castle and enjoy a scenic walk"
    //             },
    //             {
    //             "time": "Afternoon",
    //             "description": "🖼️ Explore a famous art museum with a guided tour"
    //             },
    //             {
    //             "time": "Evening",
    //             "description": "🍷 Dine at a rooftop restaurant with local wine"
    //             }
    //         ]
    //         }
    //         // repeat for each day
    //     ]
    //     }

    //     Important:
    //     - All objects must use double quotes for keys and string values.
    //     - Each activity must include both a "time" and a "description" key.
    //     - Never use the "time" as a key directly (e.g., avoid { "Evening": "..." }).
    //     - The JSON must be valid and parseable with JSON.parse().
    //     `
    // });


    const response = await generateText({
  model: google("gemini-1.5-flash"),
  prompt: `
You are a JSON generator. Return only valid JSON that can be directly parsed by JSON.parse() in JavaScript. 
Do not include markdown, code fences, comments, explanations, or any text outside the JSON object.

Generate a ${duration}-day travel itinerary for ${country} based on the following user preferences:
- Budget: "${budget_estimate}"
- Interests: "${interests}"
- Travel Style: "${travel_style}"
- Group Type: "${group_type}"

The JSON must match exactly this structure:

{
  "name": "A descriptive title for the trip",
  "description": "A brief description of the trip and its highlights not exceeding 100 words",
  "estimatedPrice": "Lowest average price for the trip in USD, e.g. $8000",
  "duration": ${duration},
  "budget": "${budget_estimate}",
  "travelStyle": "${travel_style}",
  "country": "${country}",
  "interests": "${interests}",
  "groupType": "${group_type}",
  "bestTimeToVisit": [
    "🌸 Season (from month to month): reason to visit",
    "☀️ Season (from month to month): reason to visit",
    "🍁 Season (from month to month): reason to visit",
    "❄️ Season (from month to month): reason to visit"
  ],
  "weatherInfo": [
    "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
  ],
  "location": {
    "city": "Name of the city or region",
    "coordinates": [latitude, longitude],
    "openStreetMap": "https://www.openstreetmap.org/#map=6/latitude/longitude"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {
          "time": "Morning",
          "description": "🏰 Visit the local historic castle and enjoy a scenic walk"
        },
        {
          "time": "Afternoon",
          "description": "🖼️ Explore a famous art museum with a guided tour"
        },
        {
          "time": "Evening",
          "description": "🍷 Dine at a rooftop restaurant with local wine"
        }
      ]
    }
    // Repeat for each day up to ${duration}
  ]
}

Rules:
1. Only output valid JSON (UTF-8, no trailing commas, double quotes for keys and string values).
2. Each activity must include both a "time" and "description" key.
3. Do not wrap the JSON in triple backticks or any formatting syntax.
4. Do not add comments or extra text.
5. Ensure numbers (like coordinates) are numeric, not strings.
`
});


    const images = await generateTripImages(`${country} ${interests} ${travel_style}`);

    if(!images){
        return NextResponse.json({
            result: "Images is not found",
            status: 401
        });
    }

    if (!response.text) {
        return NextResponse.json({
            result: "No trip generate",
            status: 400
        })
    }

    return NextResponse.json({
        result: response.text,
        images: images.map((src : {image : string}) => src.image),
        status: 200
    })
}