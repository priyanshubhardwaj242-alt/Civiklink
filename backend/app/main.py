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

from .matching import match_schemes

@app.get("/api/status")
def status():
    return {"ok": True, "service": "matching", "scheme_count": len(SCHEMES)}

@app.post("/api/match")
def match(request: MatchRequest):
    return {"profile": request.profile.model_dump(), "results": match_schemes(request.profile.model_dump(), SCHEMES, request.limit)}
