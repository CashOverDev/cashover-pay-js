const languages = {
  en: { pay: "PAY" },
  fr: { pay: "PAY" },
  ar: { pay: "PAY" },
};

export class CashOverLocalization {
  static translate(key, language = navigator.language.slice(0, 2)) {
    if (!languages[language]) language = "en";
    return languages[language][key] || languages["en"][key] || key;
  }
}
