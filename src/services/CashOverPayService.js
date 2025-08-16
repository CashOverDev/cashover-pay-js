export class CashOverPayService {
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
