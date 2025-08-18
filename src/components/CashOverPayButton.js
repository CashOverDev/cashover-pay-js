import { CashOverPayService } from "../services/CashOverPayService";
import { ButtonDefaults } from "../constants";
import { CashOverLocalization } from "../utils/localization";

class CashOverPayButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const cashOverButton = document.createElement("button");

    cashOverButton.textContent = CashOverLocalization.translate("buy_with");

    // Apply styles from constants
    cashOverButton.style.backgroundColor = ButtonDefaults.backgroundColor;
    cashOverButton.style.color = ButtonDefaults.textColor;
    cashOverButton.style.fontSize = ButtonDefaults.fontSize;
    cashOverButton.style.fontWeight = ButtonDefaults.fontWeight;
    cashOverButton.style.padding = ButtonDefaults.padding;
    cashOverButton.style.borderRadius = ButtonDefaults.borderRadius;
    cashOverButton.style.border = ButtonDefaults.border;
    cashOverButton.style.cursor = ButtonDefaults.cursor;

    // Payment click handler
    cashOverButton.addEventListener("click", () => {
      CashOverPayService.instance.pay({
        merchantUsername: this.getAttribute("merchantUsername"),
        storeUsername: this.getAttribute("storeUsername"),
        amount: parseFloat(this.getAttribute("amount")),
        currency: this.getAttribute("currency"),
        metadata: JSON.parse(this.getAttribute("metadata") || "{}"),
      });
    });

    this.shadowRoot.appendChild(cashOverButton);
  }
}

customElements.define("cashover-pay-button", CashOverPayButton);
export default CashOverPayButton;
