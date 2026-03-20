const languages = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Assamese", "Aymara", "Azerbaijani", 
    "Bambara", "Basque", "Belarusian", "Bengali", "Bhojpuri", "Bosnian", "Bulgarian", "Burmese", 
    "Catalan", "Cebuano", "Chinese (Simplified)", "Chinese (Traditional)", "Corsican", "Croatian", 
    "Czech", "Danish", "Dhivehi", "Dogri", "Dutch", "English", "Esperanto", "Estonian", "Ewe", 
    "Filipino", "Finnish", "French", "Frisian", "Galician", "Georgian", "German", "Greek", 
    "Guarani", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", 
    "Hungarian", "Icelandic", "Igbo", "Ilocano", "Indonesian", "Irish", "Italian", "Japanese", 
    "Javanese", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Konkani", "Korean", "Krio", 
    "Kurdish (Kurmanji)", "Kurdish (Sorani)", "Kyrgyz", "Lao", "Latin", "Latvian", "Lingala", 
    "Lithuanian", "Luganda", "Luxembourgish", "Macedonian", "Maithili", "Malagasy", "Malay", 
    "Malayalam", "Maltese", "Maori", "Marathi", "Meiteilon (Manipuri)", "Mizo", "Mongolian", 
    "Nepali", "Norwegian", "Nyanja (Chichewa)", "Odia (Oriya)", "Oromo", "Pashto", "Persian", 
    "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan", "Sanskrit", 
    "Scots Gaelic", "Sepedi", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", 
    "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tajik", "Tamil", 
    "Tatar", "Telugu", "Thai", "Tigrinya", "Tsonga", "Turkish", "Turkmen", "Twi (Akan)", 
    "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", 
    "Yoruba", "Zulu"
];

function populateLanguages(container) {
    languages.forEach(lang => {
        if (lang !== "English") {
            const option = document.createElement('option');
            option.value = lang.toLowerCase();
            option.textContent = lang;
            container.appendChild(option);
        }
    });
}
