(function () {
  'use strict';

  class CashOverPayService {
    static instance = new CashOverPayService();

    constructor() {
      if (CashOverPayService._instance) {
        return CashOverPayService._instance;
      }
      CashOverPayService._instance = this;
    }

    pay({ merchantUsername, storeUsername, amount, currency, metadata = {} }) {
      metadata.storeUserName = storeUsername;

      const encodedMetadata = encodeURIComponent(JSON.stringify(metadata));

      const url =
        `https://staging.cashover.money/pay?` +
        `userName=${merchantUsername}&amount=${amount}&currency=${currency}&metadata=${encodedMetadata}`;
      console.log(`This is url: ${url}`);
      window.open(url, "_blank");
    }
  }

  const ButtonDefaults = {
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "600",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  };

  const languages = {
    en: { buy_with: "Buy with CashOver" },
    fr: { buy_with: "Achetez avec CashOver" },
    ar: { buy_with: "اشتري باستخدام CashOver" },
  };

  class CashOverLocalization {
    static translate(key, language = navigator.language.slice(0, 2)) {
      if (!languages[language]) language = "en";
      return languages[language][key] || languages["en"][key] || key;
    }
  }

  class CashOverPayButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      const button = document.createElement("button");

      button.textContent = CashOverLocalization.translate("buy_with");

      // Apply styles from constants
      button.style.backgroundColor = ButtonDefaults.backgroundColor;
      button.style.color = ButtonDefaults.textColor;
      button.style.fontSize = ButtonDefaults.fontSize;
      button.style.fontWeight = ButtonDefaults.fontWeight;
      button.style.padding = ButtonDefaults.padding;
      button.style.borderRadius = ButtonDefaults.borderRadius;
      button.style.border = ButtonDefaults.border;
      button.style.cursor = ButtonDefaults.cursor;

      // Payment click handler
      button.addEventListener("click", () => {
        CashOverPayService.instance.pay({
          merchantUsername: this.getAttribute("merchantUsername"),
          storeUsername: this.getAttribute("storeUsername"),
          amount: parseFloat(this.getAttribute("amount")),
          currency: this.getAttribute("currency"),
          metadata: JSON.parse(this.getAttribute("metadata") || "{}"),
        });
      });

      this.shadowRoot.appendChild(button);
    }
  }

  customElements.define("cashover-pay-button", CashOverPayButton);

  // Only expose the custom element registration, no service
  window.CashOverPayButton = CashOverPayButton;

})();
