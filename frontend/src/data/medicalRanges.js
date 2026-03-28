// WHO/ICMR Medical Reference Ranges
export const medicalRanges = {
  hemoglobin: {
    name: 'Hemoglobin',
    nameHi: 'हीमोग्लोबिन',
    unit: 'g/dL',
    ranges: {
      male: { low: 0, normal_low: 13, normal_high: 17, high: 20 },
      female: { low: 0, normal_low: 12, normal_high: 15, high: 18 },
      child: { low: 0, normal_low: 11, normal_high: 13, high: 16 },
      pregnant: { low: 0, normal_low: 11, normal_high: 14, high: 17 }
    },
    conditions: {
      low: { condition: 'anemia', label: 'Anemia (Iron Deficiency)', labelHi: 'एनीमिया (आयरन की कमी)', severity: 'warning', advice: 'Eat iron-rich foods: spinach, jaggery, pomegranate, dates. Take iron supplements as prescribed. Get vitamin C for better absorption.', adviceHi: 'आयरन युक्त भोजन खाएं: पालक, गुड़, अनार, खजूर। डॉक्टर द्वारा बताए गए आयरन सप्लीमेंट लें।' },
      veryLow: { condition: 'severe-anemia', label: 'Severe Anemia', labelHi: 'गंभीर एनीमिया', severity: 'danger', advice: 'URGENT: Visit a doctor immediately. You may need iron injections or blood transfusion. Severe anemia can be life-threatening.', adviceHi: 'तुरंत: डॉक्टर से तुरंत मिलें। आपको आयरन इंजेक्शन या रक्त आधान की आवश्यकता हो सकती है।' }
    }
  },
  glucose_fasting: {
    name: 'Fasting Blood Sugar',
    nameHi: 'खाली पेट शुगर',
    unit: 'mg/dL',
    ranges: {
      all: { low: 50, normal_low: 70, normal_high: 100, prediabetic: 125, high: 200 }
    },
    conditions: {
      low: { condition: 'hypoglycemia', label: 'Low Blood Sugar', labelHi: 'कम ब्लड शुगर', severity: 'warning', advice: 'Eat something sweet immediately. Keep glucose tablets handy. If frequent, consult doctor.', adviceHi: 'तुरंत कुछ मीठा खाएं। ग्लूकोज की गोलियां पास रखें। बार-बार होने पर डॉक्टर से मिलें।' },
      prediabetic: { condition: 'prediabetes', label: 'Pre-Diabetes', labelHi: 'प्री-डायबिटीज', severity: 'warning', advice: 'Your sugar is borderline. Reduce sugar/refined carbs. Exercise 30 min daily. Recheck in 3 months.', adviceHi: 'आपकी शुगर बॉर्डरलाइन है। चीनी/मैदा कम करें। रोज 30 मिनट व्यायाम करें। 3 महीने में दोबारा जांच कराएं।' },
      high: { condition: 'diabetes', label: 'Diabetes', labelHi: 'मधुमेह', severity: 'danger', advice: 'Your blood sugar is HIGH. Consult a doctor urgently. Reduce sugar, rice, and processed foods. Regular exercise and medication needed.', adviceHi: 'आपकी ब्लड शुगर ज़्यादा है। तुरंत डॉक्टर से मिलें। चीनी, चावल और प्रोसेस्ड फूड कम करें।' }
    }
  },
  hba1c: {
    name: 'HbA1c',
    nameHi: 'एचबीए1सी',
    unit: '%',
    ranges: {
      all: { normal_high: 5.7, prediabetic: 6.4, high: 8, veryHigh: 10 }
    },
    conditions: {
      prediabetic: { condition: 'prediabetes', label: 'Pre-Diabetes', labelHi: 'प्री-डायबिटीज', severity: 'warning' },
      high: { condition: 'diabetes', label: 'Poorly Controlled Diabetes', labelHi: 'अनियंत्रित मधुमेह', severity: 'danger' },
      veryHigh: { condition: 'diabetes', label: 'Very Poorly Controlled Diabetes', labelHi: 'बहुत अनियंत्रित मधुमेह', severity: 'danger' }
    }
  },
  bp_systolic: {
    name: 'Blood Pressure (Systolic)',
    nameHi: 'रक्तचाप (सिस्टोलिक)',
    unit: 'mmHg',
    ranges: {
      all: { low: 70, normal_low: 90, normal_high: 120, elevated: 130, high: 140, crisis: 180 }
    },
    conditions: {
      low: { condition: 'hypotension', label: 'Low Blood Pressure', labelHi: 'कम रक्तचाप', severity: 'warning' },
      elevated: { condition: 'hypertension', label: 'Elevated BP', labelHi: 'बढ़ा हुआ रक्तचाप', severity: 'warning' },
      high: { condition: 'hypertension', label: 'High Blood Pressure', labelHi: 'उच्च रक्तचाप', severity: 'danger' },
      crisis: { condition: 'hypertension-crisis', label: 'Hypertensive Crisis', labelHi: 'उच्च रक्तचाप संकट', severity: 'danger' }
    }
  },
  cholesterol: {
    name: 'Total Cholesterol',
    nameHi: 'कुल कोलेस्ट्रॉल',
    unit: 'mg/dL',
    ranges: {
      all: { normal_high: 200, borderline: 239, high: 300 }
    },
    conditions: {
      borderline: { condition: 'high-cholesterol', label: 'Borderline High Cholesterol', labelHi: 'बॉर्डरलाइन उच्च कोलेस्ट्रॉल', severity: 'warning' },
      high: { condition: 'high-cholesterol', label: 'High Cholesterol', labelHi: 'उच्च कोलेस्ट्रॉल', severity: 'danger' }
    }
  },
  creatinine: {
    name: 'Serum Creatinine',
    nameHi: 'सीरम क्रिएटिनिन',
    unit: 'mg/dL',
    ranges: {
      male: { normal_low: 0.7, normal_high: 1.3, high: 2.0 },
      female: { normal_low: 0.6, normal_high: 1.1, high: 1.8 }
    },
    conditions: {
      high: { condition: 'kidney', label: 'Kidney Function Concern', labelHi: 'किडनी कार्य चिंता', severity: 'danger', advice: 'Elevated creatinine suggests kidney stress. Drink plenty of water. Avoid excess protein and salt. Consult nephrologist.', adviceHi: 'बढ़ा हुआ क्रिएटिनिन किडनी तनाव दर्शाता है। खूब पानी पिएं। अधिक प्रोटीन और नमक से बचें। नेफ्रोलॉजिस्ट से मिलें।' }
    }
  },
  tsh: {
    name: 'TSH (Thyroid)',
    nameHi: 'टीएसएच (थायरॉइड)',
    unit: 'mIU/L',
    ranges: {
      all: { low: 0.1, normal_low: 0.4, normal_high: 4.0, high: 10 }
    },
    conditions: {
      low: { condition: 'hyperthyroidism', label: 'Overactive Thyroid', labelHi: 'अतिसक्रिय थायरॉइड', severity: 'warning' },
      high: { condition: 'hypothyroidism', label: 'Underactive Thyroid', labelHi: 'कम सक्रिय थायरॉइड', severity: 'warning' }
    }
  },
  wbc: {
    name: 'WBC Count',
    nameHi: 'डब्ल्यूबीसी काउंट',
    unit: 'cells/mcL',
    ranges: {
      all: { low: 2000, normal_low: 4500, normal_high: 11000, high: 15000 }
    },
    conditions: {
      low: { condition: 'low-immunity', label: 'Low Immunity', labelHi: 'कम रोग प्रतिरोधक', severity: 'warning' },
      high: { condition: 'infection', label: 'Possible Infection', labelHi: 'संभावित संक्रमण', severity: 'warning' }
    }
  },
  platelet: {
    name: 'Platelet Count',
    nameHi: 'प्लेटलेट काउंट',
    unit: 'lakh/mcL',
    ranges: {
      all: { low: 0.5, normal_low: 1.5, normal_high: 4.0, high: 5.0 }
    },
    conditions: {
      low: { condition: 'low-platelets', label: 'Low Platelets', labelHi: 'कम प्लेटलेट्स', severity: 'danger', advice: 'Low platelets can cause bleeding risk. May indicate dengue, infection, or other conditions. Consult doctor immediately.', adviceHi: 'कम प्लेटलेट्स से रक्तस्राव का खतरा हो सकता है। डेंगू, संक्रमण या अन्य स्थितियों का संकेत हो सकता है। तुरंत डॉक्टर से मिलें।' }
    }
  }
};

// Languages supported
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' }
];
