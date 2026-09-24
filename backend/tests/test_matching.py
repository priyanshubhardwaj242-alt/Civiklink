from app.matching import match_schemes


def test_matching_returns_sorted_results():
    schemes = [
        {"id": "SCH-002", "name": "General", "category": "edu"},
        {"id": "SCH-001", "name": "Education", "category": "edu"},
        {"id": "SCH-003", "name": "Business", "category": "msme"},
    ]
    profile = {"occupation": "Student", "need": "Education / Scholarship", "age": 20}
    results = match_schemes(profile, schemes, 3)

    assert len(results) == 3
    assert results[0]["scheme"]["id"] in {"SCH-001", "SCH-002"}
    assert results[0]["score"] >= results[-1]["score"]


def test_matching_respects_limit():
    schemes = [{"id": f"SCH-{i:03d}", "name": f"Scheme {i}", "category": "msme"} for i in range(1, 6)]
    results = match_schemes({"occupation": "Small Business / MSME"}, schemes, 2)
    assert len(results) == 2
