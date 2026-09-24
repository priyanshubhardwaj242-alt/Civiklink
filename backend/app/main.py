from pathlib import Path
from typing import Any
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
with open(BASE_DIR / "schemes.json", "r", encoding="utf-8") as f:
    SCHEMES = json.load(f)

app = FastAPI(title="CivicLink Matching API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class Profile(BaseModel):
    name: str | None = None
    age: int | str | None = None
    gender: str | None = None
    category: str | None = None
    income: str | None = None
    occupation: str | None = None
    state: str | None = None
    need: str | None = None

class MatchRequest(BaseModel):
    profile: Profile
    limit: int = Field(default=12, ge=1, le=50)

def match_schemes(profile: dict[str, Any], limit: int = 12):
    results = []
    for scheme in SCHEMES:
        score = 40
        reasons = []
        unmet = []
        occupation = profile.get("occupation")
        need = profile.get("need")
        gender = profile.get("gender")
        income = profile.get("income")
        try: age = int(profile.get("age") or 0)
        except (TypeError, ValueError): age = 0

        if occupation == "Farmer" and scheme["category"] == "agri":
            score += 25; reasons.append("You reported farming as your occupation")
        if occupation == "Artisan / Craftsperson" and scheme["category"] == "artisan":
            score += 25; reasons.append("Traditional artisan trades are covered")
        if occupation == "Small Business / MSME" and scheme["category"] == "msme":
            score += 25; reasons.append("MSME entrepreneurs are the target group")
        if occupation == "Student" and scheme["category"] == "edu":
            score += 25; reasons.append("Students are the target group for this education scheme")

        need_map = {
            "Business Loan": ("msme", "Matches your requirement for business credit"),
            "Education / Scholarship": ("edu", "Matches your scholarship requirement"),
            "Health / Insurance": ("health", "Matches your health / insurance requirement"),
            "Pension / Social Security": ("social", "Matches your social security requirement"),
            "Agriculture Support": ("agri", "Supports agriculture and rural development"),
        }
        if need in need_map and scheme["category"] == need_map[need][0]:
            score += 15; reasons.append(need_map[need][1])
        if need == "Housing" and scheme.get("sector") == "Housing":
            score += 15; reasons.append("Provides housing assistance")
        if gender == "Female" and (scheme.get("beneficiary") == "Women" or "Women" in scheme.get("name", "")):
            score += 10; reasons.append("Women are included in the recorded beneficiary group")
        if income and income.startswith("Below") and scheme.get("beneficiary") == "Below Poverty Line":
            score += 10; reasons.append("Income bracket aligns with the recorded beneficiary group")
        if 18 <= age <= 70 and scheme.get("sector") == "Insurance":
            score += 5; reasons.append("Age falls within the broad insurance age range used by the matching rule")
        if age >= 60 and scheme.get("category") == "social" and "Pension" in scheme.get("name", ""):
            score += 8; reasons.append("Age aligns with pension-oriented matching")
        if not reasons: unmet.append("Profile does not directly indicate a primary match")
        results.append({"scheme": scheme, "score": min(score, 98), "reasons": reasons, "unmet": unmet})
    results.sort(key=lambda x: (-x["score"], x["scheme"]["id"]))
    return results[:limit]

@app.get("/api/status")
def status():
    return {"ok": True, "service": "matching", "scheme_count": len(SCHEMES)}

@app.post("/api/match")
def match(request: MatchRequest):
    return {"profile": request.profile.model_dump(), "results": match_schemes(request.profile.model_dump(), request.limit)}
