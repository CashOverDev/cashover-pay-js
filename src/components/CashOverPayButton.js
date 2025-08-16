// CashOverPayButton.js
import { CashOverPayService } from "../services/CashOverPayService";
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
export default CashOverPayButton;
