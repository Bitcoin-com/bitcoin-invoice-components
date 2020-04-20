# Build on Bitcoin Cash (BCH)

 > React component for BIP70 invoices on BCH. BCH and SLP invoices are supported.

This repo is a fork of [badger-components-react](https://www.npmjs.com/package/badger-components-react), and only preserves functionality for BIP70 invoice components. For general components, see [badger-components-react](https://www.npmjs.com/package/badger-components-react).


### Install

```bash
$ npm install --save badger-components-react
```

### Install Peer Dependencies

This library depends on the following three peer dependencies

* `styled-components` ^4.0.0
* `react` ^16.3.0
* `react-dom` ^16.3.0

```bash
$ npm install --save styled-components react react-dom
```

### Add to React Project

```js
import React from 'react'
import { Invoice } from 'bitcoin-invoice-components'

const Example = (props) => {

  // URL structure of your bip70 invoice
  const bip70base = 'https://pay.bitcoin.com/i/'

  // Payment ID of your bip70 invoice
  const paymentId = 'EGKe7SA1TmttK2E3fakdg8'


  return (
    <>
      {/* Minimal Example */}
      <Invoice
        sizeQR={250}
        copyUri
        paymentRequestUrl={`${bip70base}${paymentId}`}
        successFn={() => console.log('success example function called')}
				failFn={() => console.log('fail example function called')}
      />
    </>
  )
};

export default Example
```