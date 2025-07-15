
// Simple English to Urdu translation dictionary
// In a real implementation, this would be much more comprehensive
export const englishToUrdu: Record<string, string> = {
  // Common words
  "the": "یہ",
  "and": "اور",
  "of": "کا",
  "to": "کو",
  "in": "میں",
  "is": "ہے",
  "for": "کے لیے",
  "with": "کے ساتھ",
  "this": "یہ",
  "that": "وہ",
  "blog": "بلاگ",
  "post": "پوسٹ",
  "article": "مضمون",
  "technology": "ٹیکنالوجی",
  "user": "صارف",
  "experience": "تجربہ",
  "design": "ڈیزائن",
  "development": "ترقی",
  "software": "سافٹ ویئر",
  "application": "ایپلیکیشن",
  "website": "ویب سائٹ",
  "data": "ڈیٹا",
  "information": "معلومات",
  "content": "مواد",
  "summary": "خلاصہ",
  "main": "اہم",
  "points": "نکات",
  "include": "شامل",
  "innovative": "جدید",
  "approaches": "طریقے",
  "practical": "عملی",
  "implementation": "نفاذ",
  "strategies": "حکمت عملیاں",
};

export const translateToUrdu = (text: string): string => {
  // Simple word-by-word translation
  // In a real implementation, this would handle grammar, context, etc.
  const words = text.toLowerCase().split(/\s+/);
  
  const translatedWords = words.map(word => {
    // Remove punctuation for lookup
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    return englishToUrdu[cleanWord] || word;
  });

  return translatedWords.join(' ');
};

// Function to create a more natural Urdu translation
export const createUrduSummary = (englishSummary: string): string => {
  // For demo purposes, return a pre-written Urdu summary
  // In real implementation, this would use the translation dictionary more intelligently
  const sentences = englishSummary.split('. ');
  
  if (sentences.length > 0) {
    // Return a contextually appropriate Urdu translation
    return "یہ بلاگ پوسٹ کا خلاصہ ہے جو اہم نکات کو اجاگر کرتا ہے۔ اس میں ٹیکنالوجی کے جدید طریقے، صارف تجربہ ڈیزائن، اور عملی نفاذ کی حکمت عملیاں شامل ہیں۔";
  }
  
  return translateToUrdu(englishSummary);
};
