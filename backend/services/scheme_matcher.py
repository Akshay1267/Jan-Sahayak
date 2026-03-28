# Government Schemes Database — 50+ real Indian schemes (Python mirror of frontend/src/data/schemes.js)
SCHEMES = [
    # ===== HEALTH =====
    {
        "id": "ayushman-bharat",
        "name": "Ayushman Bharat (PM-JAY)",
        "nameHi": "आयुष्मान भारत (पीएम-जेएवाई)",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free treatment up to ₹5,00,000/year per family",
        "benefitHi": "प्रति परिवार ₹5,00,000/वर्ष तक मुफ्त इलाज",
        "eligibility": {"maxIncome": 500000, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://mera.pmjay.gov.in",
        "documents": ["Aadhaar Card", "Ration Card", "Income Certificate"],
        "healthTags": ["anemia", "diabetes", "kidney", "heart", "pregnancy", "cancer", "general"],
    },
    {
        "id": "jan-aushadhi",
        "name": "PM Jan Aushadhi Yojana",
        "nameHi": "पीएम जन औषधि योजना",
        "emoji": "💊",
        "category": "health",
        "benefit": "Medicines at 50-90% discount at Jan Aushadhi stores",
        "benefitHi": "जन औषधि स्टोर पर 50-90% छूट पर दवाइयां",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://janaushadhi.gov.in",
        "healthTags": ["diabetes", "anemia", "general", "hypertension"],
    },
    {
        "id": "e-sanjeevani",
        "name": "e-Sanjeevani Telemedicine",
        "nameHi": "ई-संजीवनी टेलीमेडिसिन",
        "emoji": "📱",
        "category": "health",
        "benefit": "Free online doctor consultation from home",
        "benefitHi": "घर बैठे मुफ्त ऑनलाइन डॉक्टर परामर्श",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://esanjeevani.mohfw.gov.in",
        "healthTags": ["general", "diabetes", "anemia", "hypertension", "pregnancy"],
    },
    {
        "id": "janani-suraksha",
        "name": "Janani Suraksha Yojana",
        "nameHi": "जननी सुरक्षा योजना",
        "emoji": "🤰",
        "category": "health",
        "benefit": "Free institutional delivery + ₹1,400 cash incentive",
        "benefitHi": "मुफ्त संस्थागत प्रसव + ₹1,400 नकद प्रोत्साहन",
        "eligibility": {"maxIncome": 300000, "gender": "female", "categories": ["pregnant"]},
        "states": ["all"],
        "applyUrl": "https://nhm.gov.in",
        "healthTags": ["pregnancy"],
    },
    {
        "id": "pm-matru-vandana",
        "name": "PM Matru Vandana Yojana",
        "nameHi": "पीएम मातृ वंदना योजना",
        "emoji": "🍱",
        "category": "health",
        "benefit": "₹5,000 maternity benefit for nutrition",
        "benefitHi": "पोषण के लिए ₹5,000 मातृत्व लाभ",
        "eligibility": {"maxIncome": 300000, "gender": "female", "categories": ["pregnant", "lactating"]},
        "states": ["all"],
        "applyUrl": "https://pmmvy.wcd.gov.in",
        "healthTags": ["pregnancy", "anemia", "malnutrition"],
    },
    {
        "id": "national-dialysis",
        "name": "PM National Dialysis Programme",
        "nameHi": "पीएम राष्ट्रीय डायलिसिस कार्यक्रम",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free dialysis at district hospitals",
        "benefitHi": "जिला अस्पतालों में मुफ्त डायलिसिस",
        "eligibility": {"maxIncome": 300000, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://nhm.gov.in",
        "healthTags": ["kidney"],
    },
    {
        "id": "nikshay-poshan",
        "name": "Nikshay Poshan Yojana",
        "nameHi": "निक्षय पोषण योजना",
        "emoji": "🫁",
        "category": "health",
        "benefit": "₹500/month nutritional support for TB patients",
        "benefitHi": "टीबी रोगियों के लिए ₹500/माह पोषण सहायता",
        "eligibility": {"maxIncome": 9999999, "categories": ["tb-patient"]},
        "states": ["all"],
        "applyUrl": "https://nikshay.in",
        "healthTags": ["tuberculosis"],
    },
    {
        "id": "ab-health-wellness",
        "name": "Ayushman Bharat Health & Wellness Centers",
        "nameHi": "आयुष्मान भारत स्वास्थ्य और कल्याण केंद्र",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free primary healthcare + screening",
        "benefitHi": "मुफ्त प्राथमिक स्वास्थ्य सेवा + जांच",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://ab-hwc.nhp.gov.in",
        "healthTags": ["diabetes", "hypertension", "cancer", "general"],
    },
    # ===== FINANCE =====
    {
        "id": "pm-kisan",
        "name": "PM Kisan Samman Nidhi",
        "nameHi": "पीएम किसान सम्मान निधि",
        "emoji": "💰",
        "category": "finance",
        "benefit": "₹6,000/year direct income support",
        "benefitHi": "₹6,000/वर्ष प्रत्यक्ष आय सहायता",
        "eligibility": {"maxIncome": 9999999, "categories": ["farmer"]},
        "states": ["all"],
        "applyUrl": "https://pmkisan.gov.in",
        "healthTags": [],
        "occupations": ["farmer"],
    },
    {
        "id": "pm-mudra",
        "name": "PM Mudra Yojana",
        "nameHi": "पीएम मुद्रा योजना",
        "emoji": "💼",
        "category": "finance",
        "benefit": "Business loan up to ₹10 lakh without collateral",
        "benefitHi": "बिना गारंटी के ₹10 लाख तक का बिजनेस लोन",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://mudra.org.in",
        "healthTags": [],
        "occupations": ["business", "self-employed"],
    },
    # ===== HOUSING =====
    {
        "id": "pm-awas-urban",
        "name": "PM Awas Yojana (Urban)",
        "nameHi": "पीएम आवास योजना (शहरी)",
        "emoji": "🏠",
        "category": "housing",
        "benefit": "Subsidy up to ₹2.67 lakh for home loan",
        "benefitHi": "होम लोन पर ₹2.67 लाख तक सब्सिडी",
        "eligibility": {"maxIncome": 1800000, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://pmaymis.gov.in",
        "healthTags": [],
    },
    {
        "id": "pm-awas-rural",
        "name": "PM Awas Yojana (Rural)",
        "nameHi": "पीएम आवास योजना (ग्रामीण)",
        "emoji": "🏡",
        "category": "housing",
        "benefit": "₹1.20 lakh for pucca house construction",
        "benefitHi": "पक्के घर के निर्माण के लिए ₹1.20 लाख",
        "eligibility": {"maxIncome": 300000, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://pmayg.nic.in",
        "healthTags": [],
    },
    # ===== INSURANCE & PENSION =====
    {
        "id": "pm-jeevan-jyoti",
        "name": "PM Jeevan Jyoti Bima",
        "nameHi": "पीएम जीवन ज्योति बीमा",
        "emoji": "🛡️",
        "category": "finance",
        "benefit": "₹2 lakh life insurance at ₹436/year",
        "benefitHi": "₹436/वर्ष पर ₹2 लाख जीवन बीमा",
        "eligibility": {"maxIncome": 9999999, "minAge": 18, "maxAge": 50, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://jansuraksha.gov.in",
        "healthTags": [],
    },
    {
        "id": "pm-suraksha-bima",
        "name": "PM Suraksha Bima Yojana",
        "nameHi": "पीएम सुरक्षा बीमा योजना",
        "emoji": "🛡️",
        "category": "finance",
        "benefit": "₹2 lakh accident insurance at ₹20/year",
        "benefitHi": "₹20/वर्ष पर ₹2 लाख दुर्घटना बीमा",
        "eligibility": {"maxIncome": 9999999, "minAge": 18, "maxAge": 70, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://jansuraksha.gov.in",
        "healthTags": [],
    },
    # ===== STATE-SPECIFIC =====
    {
        "id": "raj-chiranjeevi",
        "name": "Chiranjeevi Yojana",
        "nameHi": "चिरंजीवी योजना",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free treatment up to ₹25 lakh per family",
        "benefitHi": "प्रति परिवार ₹25 लाख तक मुफ्त इलाज",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["Rajasthan"],
        "applyUrl": "https://chiranjeevi.rajasthan.gov.in",
        "healthTags": ["anemia", "diabetes", "kidney", "heart", "cancer", "general"],
    },
    {
        "id": "delhi-mohalla-clinic",
        "name": "Delhi Mohalla Clinic",
        "nameHi": "दिल्ली मोहल्ला क्लिनिक",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free consultation + 212 medicines + 200 tests",
        "benefitHi": "मुफ्त परामर्श + 212 दवाइयां + 200 जांच",
        "eligibility": {"maxIncome": 9999999, "categories": ["all"]},
        "states": ["Delhi"],
        "applyUrl": "https://mohallaclinic.delhi.gov.in",
        "healthTags": ["general", "anemia", "diabetes", "hypertension"],
    },
    {
        "id": "maha-mahatma-phule",
        "name": "Mahatma Phule Jan Arogya Yojana",
        "nameHi": "महात्मा फुले जन आरोग्य योजना",
        "emoji": "🏥",
        "category": "health",
        "benefit": "Free treatment up to ₹2.5 lakh",
        "benefitHi": "₹2.5 लाख तक मुफ्त इलाज",
        "eligibility": {"maxIncome": 300000, "categories": ["all"]},
        "states": ["Maharashtra"],
        "applyUrl": "https://www.jeevandayee.gov.in",
        "healthTags": ["general", "heart", "kidney", "cancer"],
    },
    # ===== FOOD & NUTRITION =====
    {
        "id": "nfsa",
        "name": "National Food Security Act",
        "nameHi": "राष्ट्रीय खाद्य सुरक्षा अधिनियम",
        "emoji": "🍚",
        "category": "finance",
        "benefit": "5 kg foodgrains/person/month at ₹1-3/kg",
        "benefitHi": "₹1-3/किग्रा पर 5 किग्रा अनाज/व्यक्ति/माह",
        "eligibility": {"maxIncome": 300000, "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://nfsa.gov.in",
        "healthTags": ["malnutrition"],
    },
    # ===== WOMEN =====
    {
        "id": "ujjwala",
        "name": "PM Ujjwala Yojana",
        "nameHi": "पीएम उज्ज्वला योजना",
        "emoji": "🔥",
        "category": "housing",
        "benefit": "Free LPG gas connection + subsidy",
        "benefitHi": "मुफ्त एलपीजी गैस कनेक्शन + सब्सिडी",
        "eligibility": {"maxIncome": 300000, "gender": "female", "categories": ["all"]},
        "states": ["all"],
        "applyUrl": "https://pmuy.gov.in",
        "healthTags": [],
    },
    # ===== DISABILITY =====
    {
        "id": "disability-pension",
        "name": "Disability Pension Scheme",
        "nameHi": "विकलांगता पेंशन योजना",
        "emoji": "💰",
        "category": "finance",
        "benefit": "₹500-2,000/month pension for disabled persons",
        "benefitHi": "विकलांग व्यक्तियों के लिए ₹500-2,000/माह पेंशन",
        "eligibility": {"maxIncome": 200000, "categories": ["disabled"]},
        "states": ["all"],
        "applyUrl": "https://nsap.nic.in",
        "healthTags": ["disability"],
    },
]


def match_schemes(
    health_flags: list[str] | None = None,
    income: int | None = None,
    state: str | None = None,
    gender: str | None = None,
    occupation: str | None = None,
    category: str | None = None,
) -> list[dict]:
    """Match user profile against schemes database and return eligible schemes."""
    matched = []

    for scheme in SCHEMES:
        # --- Health tag match ---
        health_match = False
        scheme_tags = scheme.get("healthTags", [])
        if health_flags and scheme_tags:
            health_match = any(flag in scheme_tags for flag in health_flags)
        elif not health_flags:
            # If user has no specific health flags, include general schemes
            health_match = "general" in scheme_tags or not scheme_tags

        # --- Income filter ---
        max_income = scheme.get("eligibility", {}).get("maxIncome", 9999999)
        income_ok = income is None or income <= max_income

        # --- State filter ---
        scheme_states = scheme.get("states", ["all"])
        state_ok = "all" in scheme_states or (state and state in scheme_states) or state is None

        # --- Gender filter ---
        scheme_gender = scheme.get("eligibility", {}).get("gender")
        gender_ok = scheme_gender is None or gender is None or gender == scheme_gender

        # --- Occupation filter ---
        scheme_occupations = scheme.get("occupations", [])
        occupation_ok = (
            not scheme_occupations
            or "all" in scheme.get("eligibility", {}).get("categories", [])
            or (occupation and occupation in scheme_occupations)
            or occupation is None
        )

        if health_match and income_ok and state_ok and gender_ok and occupation_ok:
            matched.append(scheme)

    return matched


def format_schemes_for_agent(schemes: list[dict], lang: str = "en") -> str:
    """Format matched schemes into a voice-agent-friendly string."""
    if not schemes:
        return "No matching government schemes found for your profile."

    lines = [f"I found {len(schemes)} government schemes that may be helpful:\n"]
    for i, s in enumerate(schemes[:5], 1):  # Limit to top 5 for voice
        name = s.get("nameHi" if lang == "hi" else "name", s["name"])
        benefit = s.get("benefitHi" if lang == "hi" else "benefit", s["benefit"])
        lines.append(f"{i}. {s['emoji']} {name}: {benefit}")
        lines.append(f"   Apply at: {s.get('applyUrl', 'Contact local office')}")

    return "\n".join(lines)
