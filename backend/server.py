from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from pathlib import Path
from typing import Any, Dict, List, Optional
import os
import json
import re
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

SCHEMES_FILE = ROOT_DIR / "schemes.json"
try:
    SCHEMES: List[Dict[str, Any]] = json.loads(SCHEMES_FILE.read_text(encoding="utf-8"))
except Exception:
    SCHEMES = []

SCHEME_BY_ID = {s["id"]: s for s in SCHEMES}

app = FastAPI(title="CivicLink API", version="1.0.0")
api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class MatchRequest(BaseModel):
    profile: Dict[str, Any] = Field(default_factory=dict)
    limit: int = Field(default=12, ge=1, le=50)

def norm(value: Any) -> str:
    return str(value or "").strip().lower()

def match_score(profile: Dict[str, Any], scheme: Dict[str, Any]) -> Dict[str, Any]:
    score = 35
    reasons: List[str] = []
    occupation = norm(profile.get("occupation"))
    need = norm(profile.get("need"))
    gender = norm(profile.get("gender"))
    income = norm(profile.get("income"))
    category = norm(profile.get("category"))
    age = int(profile.get("age") or 0) if str(profile.get("age") or "").isdigit() else 0
    text = norm(" ".join([
        scheme.get("name", ""), scheme.get("category", ""), scheme.get("sector", ""),
        scheme.get("beneficiary", ""), scheme.get("description", "")
    ]))

    category_map = {
        "farmer": "agriculture",
        "artisan / craftsperson": "artisan",
        "small business / msme": "msme",
        "student": "education",
        "salaried": "employment",
        "homemaker": "women",
    }
    expected = category_map.get(occupation)
    if expected and expected in text:
        score += 28
        reasons.append("Your occupation aligns with this scheme's target group.")

    need_map = {
        "business loan": ["msme", "credit", "business"],
        "education / scholarship": ["education", "scholarship", "student"],
        "health / insurance": ["health", "insurance", "medical"],
        "pension / social security": ["pension", "social security", "insurance"],
        "housing": ["housing", "home"],
        "agriculture support": ["agriculture", "farmer", "rural", "livestock"],
    }
    for keyword in need_map.get(need, []):
        if keyword in text:
            score += 16
            reasons.append("The scheme matches the support you selected.")
            break

    if gender == "female" and ("women" in text or "girl" in text):
        score += 8
        reasons.append("The scheme includes women or girls among its target beneficiaries.")

    if category in {"sc", "st", "obc", "minority"} and category in text:
        score += 7
        reasons.append("Your social-category information is reflected in the scheme profile.")

    if age and "18" in scheme.get("age_rule", "") and age >= 18:
        score += 3
    if age >= 60 and ("pension" in text or "senior" in text):
        score += 6
        reasons.append("The scheme includes senior-citizen or pension support.")

    if not reasons:
        reasons.append("Your profile has a general match with this scheme category.")

    return {"score": min(score, 98), "reasons": reasons[:3], "unmet": []}

@api_router.get("/")
async def root():
    return {"message": "CivicLink API is running", "status": "ok", "schemes": len(SCHEMES)}

@api_router.get("/health")
async def health():
    return {"status": "ok", "api": "running", "schemes": len(SCHEMES)}

@api_router.get("/schemes")
async def get_schemes():
    return {"schemes": SCHEMES, "count": len(SCHEMES)}

@api_router.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: str):
    scheme = SCHEME_BY_ID.get(scheme_id)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme

@api_router.post("/match")
async def match_schemes(request: MatchRequest):
    scored = []
    for scheme in SCHEMES:
        result = match_score(request.profile, scheme)
        scored.append({
            "scheme": scheme,
            "score": result["score"],
            "reasons": result["reasons"],
            "unmet": result["unmet"],
        })
    scored.sort(key=lambda item: item["score"], reverse=True)
    return {
        "results": scored[:request.limit],
        "count": min(request.limit, len(scored)),
        "engine": "CivicLink deterministic backend matcher v1",
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    return StatusCheck(client_name=input.client_name)

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    return []

app.include_router(api_router)

origins = [x.strip() for x in os.getenv("CORS_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
