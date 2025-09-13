import pako from "pako";
import { apiDefaults } from "../constants";

export class CashOverPayService {
  static instance = new CashOverPayService();

  constructor() {
    if (CashOverPayService._instance) {
      return CashOverPayService._instance;
    }
    CashOverPayService._instance = this;
  }

  pay({
    merchantUsername,
    storeUsername,
    amount,
    currency,
    webhookIds,
    metadata = "{}",
  }) {
    const jsonMetaData = JSON.parse(metadata);
    jsonMetaData.storeUserName = storeUsername;
    // validate that metadata is a valid json

    // stringify it to be query param friendly
    const encodedMetadata = JSON.stringify(jsonMetaData);
    let queryParams = `userName=${merchantUsername}&amount=${parseFloat(
      amount
    )}&currency=${currency}&metadata=${encodedMetadata}`;
    if (webhookIds) {
      const encodedWebhookIds = JSON.stringify(jsonMetaData);
      queryParams += `&webhookIds=${encodedWebhookIds}`;
    }
    // gzip compress using pako
    const compressed = pako.gzip(queryParams);

    // base64 encode
    const base64QueryParams = btoa(
      String.fromCharCode(...new Uint8Array(compressed))
    );
    let url = `${apiDefaults.baseWebUrl}/pay?` + `session=${base64QueryParams}`;
    window.open(url, "_blank");
  }
}
