import base64
import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

ANALYSIS_PROMPT = """You are a medical report analyzer for Indian patients. Analyze this medical report image and provide a JSON response with this exact structure:
{
  "summary": "Brief 1-line summary of report type",
  "parameters": [
    {"name": "Parameter Name", "value": "detected value", "unit": "unit", "status": "normal|low|high", "normalRange": "range", "explanation": "what this means in simple terms"}
  ],
  "healthFlags": ["list of detected conditions like anemia, diabetes etc"],
  "overallAdvice": "2-3 sentences of practical health advice",
  "urgency": "normal|attention|urgent",
  "suggestedMedicines": ["list of commonly suggested OTC medicines if applicable"],
  "dietAdvice": "specific diet recommendations"
}
O
nly return valid JSON. Be accurate with medical values. Explain in simple language that a rural Indian citizen can understand."""


async def analyze_report_image(image_base64: str, mime_type: str = "image/jpeg") -> dict:
    """Send a report image to Gemini Vision and return structured analysis."""
    model = genai.GenerativeModel("gemini-2.0-flash")

    image_part = {"inline_data": {"mime_type": mime_type, "data": image_base64}}

    response = model.generate_content([ANALYSIS_PROMPT, image_part])
    text = response.text

    # Extract JSON from response
    json_match = text
    if "```json" in text:
        json_match = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        json_match = text.split("```")[1].split("```")[0].strip()

    # Find the JSON object
    start = json_match.find("{")
    end = json_match.rfind("}") + 1
    if start != -1 and end > start:
        json_match = json_match[start:end]

    return json.loads(json_match)


async def get_report_summary_for_agent(analysis: dict) -> str:
    """Convert analysis JSON into a natural language summary for the voice agent."""
    if not analysis:
        return "No analysis available for this report."

    summary_parts = [f"Report: {analysis.get('summary', 'Medical Report')}"]

    params = analysis.get("parameters", [])
    abnormal = [p for p in params if p.get("status") != "normal"]
    if abnormal:
        summary_parts.append("Abnormal findings:")
        for p in abnormal:
            summary_parts.append(
                f"  - {p['name']}: {p['value']} {p.get('unit', '')} ({p['status']}). {p.get('explanation', '')}"
            )

    flags = analysis.get("healthFlags", [])
    if flags:
        summary_parts.append(f"Health conditions detected: {', '.join(flags)}")

    advice = analysis.get("overallAdvice", "")
    if advice:
        summary_parts.append(f"Advice: {advice}")

    diet = analysis.get("dietAdvice", "")
    if diet:
        summary_parts.append(f"Diet: {diet}")

    return "\n".join(summary_parts)
