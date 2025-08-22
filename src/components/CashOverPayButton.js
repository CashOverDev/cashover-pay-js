import { CashOverPayService } from "../services/CashOverPayService";
import { ButtonDefaults } from "../constants";
import { CashOverLocalization } from "../utils/localization";
// imported here to force rollup packaging to include the asset, try to find another solution
import cashOverLogo from "../assets/cashover_logo.png";

class CashOverPayButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const cashOverButton = document.createElement("button");

    // Create container for button content
    const buttonContent = document.createElement("div");
    buttonContent.style.display = "flex";
    buttonContent.style.alignItems = "center";
    buttonContent.style.justifyContent = "center";
    buttonContent.style.gap = "0.5px";

    // Create CASH text
    const cashText = document.createElement("span");
    cashText.textContent = "CASH";

    // Create image element
    const buttonImage = document.createElement("img");
    buttonImage.src = "../dist/cashover_logo.png";
    buttonImage.alt = "CashOver";
    buttonImage.style.width = ButtonDefaults.imageSize;
    buttonImage.style.height = ButtonDefaults.imageSize;
    buttonImage.style.objectFit = "contain";

    // Create VER PAY text
    const verPayText = document.createElement("span");
    verPayText.textContent = `VER ${CashOverLocalization.translate("pay")}`;

    // Append elements to button content
    buttonContent.appendChild(cashText);
    buttonContent.appendChild(buttonImage);
    buttonContent.appendChild(verPayText);

    // Append content to button
    cashOverButton.appendChild(buttonContent);

    // Apply styles from constants
    cashOverButton.style.backgroundColor = ButtonDefaults.backgroundColor;
    cashOverButton.style.color = ButtonDefaults.textColor;
    cashOverButton.style.fontSize = ButtonDefaults.fontSize;
    cashOverButton.style.fontWeight = ButtonDefaults.fontWeight;
    cashOverButton.style.padding = ButtonDefaults.padding;
    cashOverButton.style.borderRadius = ButtonDefaults.borderRadius;
    cashOverButton.style.border = ButtonDefaults.border;
    cashOverButton.style.cursor = ButtonDefaults.cursor;

    const payload = {
      merchantUsername: this.getAttribute("merchantUsername"),
      storeUsername: this.getAttribute("storeUsername"),
      amount: this.getAttribute("amount"),
      currency: this.getAttribute("currency"),
      metadata: this.getAttribute("metadata"),
      webhookIds: this.getAttribute("webhookIds"),
    };

    // Payment click handler
    cashOverButton.addEventListener("click", () => {
      CashOverPayService.instance.pay(payload);
    });

    this.shadowRoot.appendChild(cashOverButton);
  }
}

customElements.define("cashover-pay-button", CashOverPayButton);

export default CashOverPayButton;
