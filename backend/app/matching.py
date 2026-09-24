from typing import Any

NEED_MAP = {
    "Business Loan": ("msme", "Matches your requirement for business credit"),
    "Education / Scholarship": ("edu", "Matches your scholarship requirement"),
    "Health / Insurance": ("health", "Matches your health / insurance requirement"),
    "Pension / Social Security": ("social", "Matches your social security requirement"),
    "Agriculture Support": ("agri", "Supports agriculture and rural development"),
}


def _age(value: Any) -> int:
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def match_schemes(profile: dict[str, Any], schemes: list[dict[str, Any]], limit: int = 12):
    results = []

    for scheme in schemes:
        score = 40
        reasons: list[str] = []
        unmet: list[str] = []

        occupation = profile.get("occupation")
        need = profile.get("need")
        gender = profile.get("gender")
        income = profile.get("income")
        age = _age(profile.get("age"))

        if occupation == "Farmer" and scheme.get("category") == "agri":
            score += 25
            reasons.append("You reported farming as your occupation")

        if occupation == "Artisan / Craftsperson" and scheme.get("category") == "artisan":
            score += 25
            reasons.append("Traditional artisan trades are covered")

        if occupation == "Small Business / MSME" and scheme.get("category") == "msme":
            score += 25
            reasons.append("MSME entrepreneurs are the target group")

        if occupation == "Student" and scheme.get("category") == "edu":
            score += 25
            reasons.append("Students are the target group for this education scheme")

        if need in NEED_MAP and scheme.get("category") == NEED_MAP[need][0]:
            score += 15
            reasons.append(NEED_MAP[need][1])

        if need == "Housing" and scheme.get("sector") == "Housing":
            score += 15
            reasons.append("Provides housing assistance")

        if gender == "Female" and (
            scheme.get("beneficiary") == "Women"
            or "Women" in scheme.get("name", "")
        ):
            score += 10
            reasons.append("Women are included in the recorded beneficiary group")

        if income and income.startswith("Below") and scheme.get("beneficiary") == "Below Poverty Line":
            score += 10
            reasons.append("Income bracket aligns with the recorded beneficiary group")

        if 18 <= age <= 70 and scheme.get("sector") == "Insurance":
            score += 5
            reasons.append("Age falls within the broad insurance age range used by the matching rule")

        if age >= 60 and scheme.get("category") == "social" and "Pension" in scheme.get("name", ""):
            score += 8
            reasons.append("Age aligns with pension-oriented matching")

        if not reasons:
            unmet.append("Profile does not directly indicate a primary match")

        results.append({
            "scheme": scheme,
            "score": min(score, 98),
            "reasons": reasons,
            "unmet": unmet,
        })

    results.sort(key=lambda item: (-item["score"], item["scheme"].get("id", "")))
    return results[:limit]
