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

  // CashOverPayButton.js
  class CashOverPayButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      const button = document.createElement("button");
      button.textContent = this.getAttribute("label") || "Pay with CashOver";
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
