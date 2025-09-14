# CashOver Pay JavaScript SDK

A JavaScript SDK that integrates CashOver's payment system into your web applications, providing a seamless and secure payment experience for your users.

To know more about us visit our website at https://cashover.money/

## Features

✅ **Easy Integration** - Simple setup with just a few lines of code  
✅ **Prebuilt UI Components** - Ready-to-use payment button with customizable styling  
✅ **Secure Payments** - Industry-standard security for all transactions  
✅ **Webhook Support** - Real-time payment status updates via webhooks  
✅ **Metadata Support** - Attach custom data to payments (order IDs, customer info, etc.)  
✅ **Multi-Currency** - Support for various currencies (USD, LBP, and more)  
✅ **Localization** - Multiple language support  
✅ **Theme Customization** - Light/dark theme support with customizable styling

## Getting Started

### Prerequisites

Before using this SDK, ensure you have:

- A **CashOver merchant account**, sign up [here](https://merchant.cashover.money/)
- At least one **store** created in your merchant dashboard
- Your `merchantUsername` and `storeUsername` credentials

### Installation

Add the CashOver SDK to your web application via CDN:

#### Production (Recommended)

```html
<script
  src="https://cdn.cashover.money/js-sdk/0.1.0/cashover.min.js"
  integrity="sha384-wsxBQKs56ap0SQmua1ulua0H/FMmsnvAFrkW4wf133dkaHKVq4ExpSEFuybS3XJ2"
  crossorigin="anonymous"
></script>
```

#### Development

```html
<script
  src="https://cdn.cashover.money/js-sdk/latest/cashover.js"
  integrity="sha384-QAb2Rqrh1oNccLEO0k724DTi+iphADm918RUS5NfAafxvvY/TPvRAPIQ1zILwQ1T"
  crossorigin="anonymous"
></script>
```

> ⚠️ **Warning**: Do not use the `latest` version in production! Always use a specific version for production deployments.

This will expose a global `cashover-pay-button` web component that you can use to initiate and manage payments.

## Usage

### Basic Implementation

Simply add the CashOver payment button to your HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Checkout</title>
    <script
      src="https://cdn.cashover.money/js-sdk/0.1.0/cashover.min.js"
      integrity="sha384-wsxBQKs56ap0SQmua1ulua0H/FMmsnvAFrkW4wf133dkaHKVq4ExpSEFuybS3XJ2"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="checkout-container">
      <h1>Complete Your Purchase</h1>

      <cashover-pay-button
        merchantUsername="market.example"
        storeUsername="store.example"
        amount="49.99"
        currency="USD"
        metadata='{"orderId":"A1001", "email":"customer@example.com", "country":"LB", "postalCode":"1300"}'
        language="en"
        theme="light"
        borderRadius="8px"
      >
      </cashover-pay-button>
    </div>
  </body>
</html>
```

### Configuration Parameters

| Parameter          | Required | Type          | Description                                             |
| ------------------ | -------- | ------------- | ------------------------------------------------------- |
| `merchantUsername` | ✅ Yes   | String        | Your merchant account username (e.g., "market.example") |
| `storeUsername`    | ✅ Yes   | String        | Your store username (e.g., "store.example")             |
| `amount`           | ✅ Yes   | String/Number | Transaction amount (e.g., "49.99")                      |
| `currency`         | ✅ Yes   | String        | Currency code (e.g., "USD", "LBP")                      |
| `webhookIds`       | ❌ No    | String        | Webhook IDs for payment notifications in JSON array     |
| `metadata`         | ❌ No    | String (JSON) | Additional transaction data in JSON format              |
| `language`         | ❌ No    | String        | Language code (e.g., "en")                              |
| `borderRadius`     | ❌ No    | String        | Button border radius (e.g., "8px")                      |
| `theme`            | ❌ No    | String        | UI theme ("light" or "dark")                            |

⚠️ **Important**: Make sure the values are accurate. Incorrect usernames or IDs may cause payment failures.

### Advanced Usage with Multiple Webhooks

```html
<cashover-pay-button
  merchantUsername="your_merchant"
  storeUsername="your_store"
  amount="99.99"
  currency="USD"
  webhookIds='["webhook_id_1", "webhook_id_2"]'
  metadata='{"orderId":"ORDER_12345", "customerId":"CUSTOMER_789", "sessionId":"SESSION_ABC"}'
  language="en"
  theme="dark"
  borderRadius="12px"
>
</cashover-pay-button>
```

## SRI Hashes Reference

For enhanced security in production, use the SRI hashes below:

| Version    | cashover.js Hash                                                          | cashover.min.js Hash                                                      |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| v0.1.0     | `sha384-QAb2Rqrh1oNccLEO0k724DTi+iphADm918RUS5NfAafxvvY/TPvRAPIQ1zILwQ1T` | `sha384-wsxBQKs56ap0SQmua1ulua0H/FMmsnvAFrkW4wf133dkaHKVq4ExpSEFuybS3XJ2` |
| **latest** | `sha384-QAb2Rqrh1oNccLEO0k724DTi+iphADm918RUS5NfAafxvvY/TPvRAPIQ1zILwQ1T` | `sha384-wsxBQKs56ap0SQmua1ulua0H/FMmsnvAFrkW4wf133dkaHKVq4ExpSEFuybS3XJ2` |

> ⚠️ **Important**: The `latest` version SRI hash changes with every release. Do not use SRI with the latest version in production.

## Payment Flow

1. **User Interaction**: User clicks the CashOver payment button
2. **App Launch**: CashOver Pay page opens automatically
3. **Payment Processing**: User completes payment in the CashOver app
4. **Status Updates**: Your backend receives webhook notifications
5. **UI Update**: Update your app's UI based on payment status

## Webhook Integration

For reliable payment verification, implement **webhooks** in your backend. This is the recommended way to handle payment status updates.

Typical workflow:

1. Attach metadata (e.g., `orderId`) when the user initiates a payment
2. Your webhook endpoint receives payment status updates from CashOver
3. Update your order status in your system based on the webhook payload
4. Reflect the updated status in your UI (e.g., displaying "Payment Confirmed")

Learn more about webhooks in our [documentation](https://docs.cashover.money/guides/merchant/webhooks).

## Example

Check out our [complete example app](https://github.com/CashOverDev/cashover-pay-js/tree/main/example) on GitHub to see the SDK in action.

## Documentation

For comprehensive guides and API references, visit our [full documentation](https://docs.cashover.money/).

## Additional Information

### Currency Precision

Make sure to follow the correct precision for each currency. Refer to our [currency settings documentation](https://docs.cashover.money/guides/merchant/currency-settings#supported-currencies--precision) for details.

### Security

This SDK follows industry best practices for payment security. All sensitive operations are handled by the CashOver platform, ensuring your web application never directly processes payment credentials.

### Support

For technical support, integration help, or general questions:

- 📧 Email: [contactus@cashover.money](mailto:contactus@cashover.money)
- 📚 Documentation: https://docs.cashover.money/
- 🐛 Issues: Report bugs on our [GitHub repository](https://github.com/CashOverDev/cashover-pay-js/issues)

### Contributing

We welcome contributions! Please see our contributing guidelines in the repository.

---

**Made by the CashOver team**
