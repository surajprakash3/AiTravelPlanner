import { GoogleGenAI } from '@google/genai';

let ai = null;

/** Get or create the Gemini AI client (lazy init so env vars are loaded) */
function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

/**
 * Generate a comprehensive travel itinerary using Google Gemini AI.
 *
 * @param {Object} preferences – User's travel preferences
 * @param {string} preferences.destination
 * @param {number} preferences.numberOfDays
 * @param {string} preferences.budget       – "Budget" | "Mid-Range" | "Luxury"
 * @param {string} preferences.travelStyle  – e.g. "Adventure", "Cultural"
 * @param {string} preferences.transportation
 * @param {string} preferences.foodPreferences
 * @returns {Object} Parsed JSON itinerary
 */
export async function generateItinerary(preferences) {
  const {
    destination,
    numberOfDays,
    budget,
    travelStyle,
    transportation,
    foodPreferences,
  } = preferences;

  const prompt = `
You are an expert travel planner. Create a comprehensive ${numberOfDays}-day travel itinerary for **${destination}**.

**Traveler Preferences:**
- Budget Tier: ${budget}
- Travel Style: ${travelStyle}
- Preferred Transportation: ${transportation}
- Food Preferences: ${foodPreferences}

**Return a valid JSON object** (no markdown fences, no extra text) with exactly this structure:

{
  "title": "A catchy trip title",
  "summary": "A 2-3 sentence overview of the trip",
  "dailySchedule": [
    {
      "day": 1,
      "theme": "Day theme (e.g. 'Historic Old Town Exploration')",
      "morning": {
        "activity": "Activity name",
        "description": "Brief description",
        "location": "Specific location / address",
        "estimatedTime": "e.g. 9:00 AM - 12:00 PM"
      },
      "afternoon": {
        "activity": "...",
        "description": "...",
        "location": "...",
        "estimatedTime": "..."
      },
      "evening": {
        "activity": "...",
        "description": "...",
        "location": "...",
        "estimatedTime": "..."
      }
    }
  ],
  "attractions": [
    {
      "name": "Attraction name",
      "description": "Why visit",
      "estimatedDuration": "e.g. 2-3 hours",
      "entryFee": "e.g. $15 or Free"
    }
  ],
  "hotels": [
    {
      "name": "Hotel name",
      "category": "Budget | Mid-Range | Luxury",
      "pricePerNight": "e.g. $80",
      "description": "Brief description",
      "location": "Area / neighborhood"
    }
  ],
  "restaurants": [
    {
      "name": "Restaurant name",
      "cuisine": "Type of cuisine",
      "priceRange": "e.g. $10-20 per person",
      "description": "Brief description",
      "recommendedDish": "Signature dish"
    }
  ],
  "budgetBreakdown": {
    "accommodation": "e.g. $400",
    "food": "e.g. $200",
    "transportation": "e.g. $100",
    "activities": "e.g. $150",
    "miscellaneous": "e.g. $50",
    "totalEstimate": "e.g. $900"
  },
  "packingChecklist": [
    "Item 1",
    "Item 2"
  ],
  "weatherAdvice": "Paragraph about expected weather and what to prepare for",
  "safetyTips": [
    "Tip 1",
    "Tip 2"
  ],
  "localTransportation": {
    "overview": "General transport info for the destination",
    "options": [
      {
        "mode": "e.g. Metro",
        "description": "Details",
        "cost": "e.g. $2 per ride"
      }
    ]
  }
}

Important rules:
- All ${numberOfDays} days must be in dailySchedule.
- Provide at least 5 attractions, 3 hotels (one per budget tier), 5 restaurants, 10 packing items, and 5 safety tips.
- Make budget numbers realistic for the "${budget}" tier.
- Tailor activities to the "${travelStyle}" style.
- Return ONLY valid JSON — no markdown, no code fences, no commentary.
`;

  try {
    const response = await getAI().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text.trim();

    // Strip possible markdown code fences the model might add despite instructions
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const itinerary = JSON.parse(cleaned);
    return itinerary;
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw new Error('Failed to generate itinerary. Please try again later.');
  }
}
