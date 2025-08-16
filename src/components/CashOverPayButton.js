import { CashOverPayService } from "../services/CashOverPayService";
import { ButtonDefaults } from "../constants";
import { CashOverLocalization } from "../utils/localization";

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
export default CashOverPayButton;
