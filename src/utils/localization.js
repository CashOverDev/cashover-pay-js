const languages = {
  en: { buy_with: "Buy with" },
  fr: { buy_with: "Achetez avec" },
  ar: { buy_with: "اشتري باستخدام" },
};

class CashOverLocalization {
  static translate(key, language = navigator.language.slice(0, 2)) {
    if (!languages[language]) language = "en";
    return languages[language][key] || languages["en"][key] || key;
  }
}
