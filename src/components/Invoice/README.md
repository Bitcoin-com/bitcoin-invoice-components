# Invoice

Renders a QR code invoice. Badger integration if badger wallet detected.

Features
- Invoice countdown with circle progress bar
- BCH logo QR code
- Price in BCH
- Price in USD (or other currency by prop)
- Copy URI button

## Example Usage

```jsx
import React from 'react';
import { BadgerButton } from 'badger-components-react';

class MyClass extends React.PureComponent {
	render() {

		// EatBCH address for example purposes.
		const paymentAddress = 'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
		const price = 0.1; // Amount of target currency to convert for payment
		const currency = 'CAD'; // Target currency to convert to relative BCH amount

		return (
			<section>
				<BadgerButton
					to={paymentAddress}
					price={price}
					currency={currency}

					successFn={(tx) => console.log(tx)}
					failFn={(err) => console.log(err)}
					
					text="Donate with BCH"
					opReturn={["0x6d02", "Hello BadgerButton"]}

					showBorder={false}
					showAmount={true}
					showQR={false}
					isRepeatable={false}
					repeatTimeout={4000}
					watchAddress={false}
				/>
			</section>
		);
	}
}
```

## Linking to a BIP 70 Invoice

```jsx
import React from 'react';
import { BadgerButton } from 'badger-components-react';

class MyClass extends React.PureComponent {
	render() {	

		return (
			<section>
				<BadgerButton
					paymentRequestUrl={'https://yourPaymentRequestUrl/'}

					successFn={(tx) => console.log(tx)}
					failFn={(err) => console.log(err)}
					
					text="Click to pay your invoice"

					showAmount={false}					
					
				/>
			</section>
		);
	}
}
```
