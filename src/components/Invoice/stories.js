// @flow

import React from 'react';

import { storiesOf } from '@storybook/react/dist/client/preview';
import { array, select, text, boolean, number } from '@storybook/addon-knobs';

import Invoice from './Invoice';
import { currencyOptions } from '../../utils/currency-helpers';

const defaultOpReturn = [
	'0x6d02',
	'Learn to build on BCH at https://developer.bitcoin.com',
];

const coinTypeOptions = ['BCH', 'SLP'];

// [ SPICE, NAKAMOTO, DOGECASH, BROC ]
const tokenIdOptions = [
	'4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf',
	'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
	'3916a24a051f8b3833a7fd128be51dd93015555ed9142d6106ec03267f5cdc4c',
	'259908ae44f46ef585edef4bcc1e50dc06e4c391ac4be929fae27235b8158cf1',
];

storiesOf('Invoice', module)
	.add(
		'default',
		() => (
			<Invoice
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/EW7ctYT2L88sY9RVfftmXQ'
				)}
				step={text('step', 'fresh')}
				copyUri={boolean('copyUri', true)}
				linkAvailable={boolean('linkAvailable', true)}
				successFn={() => console.log('success example function called')}
				failFn={() => console.log('fail example function called')}
				sizeQR={number('QR Code Size', 200)}
			/>
		),
		{
			notes: 'Basic Invoice.   Default has all the knobs to play with',
		}
	)
	.add(
		'BIP70 Invoicing - BCH, expired',
		() => (
			<Invoice
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/7UG3Z5y56DoXLQzQJAJxoD'
				)}
				showAmount={boolean('showAmount', true)}
				successFn={() => console.log('BIP70 Invoice successfully paid')}
				failFn={() =>
					console.log('BIP70 Invoice is expired or the URL is invalid')
				}
				copyUri={boolean('copyUri', true)}
				linkAvailable={boolean('linkAvailable', true)}
				sizeQR={number('QR Code Size', 200)}
			/>
		),
		{
			notes: 'Expired BCH invoice with no conflicting props',
		}
	)
	.add(
		'BIP70 Invoicing - SLP, Paid',
		() => (
			<Invoice
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/DFFwn544tB2A2YvekWd3Y9'
				)}
				showAmount={boolean('showAmount', true)}
				successFn={() => console.log('BIP70 Invoice successfully paid')}
				failFn={() =>
					console.log('BIP70 Invoice is expired or the URL is invalid')
				}
				copyUri={boolean('copyUri', true)}
				linkAvailable={boolean('linkAvailable', true)}
				sizeQR={number('QR Code Size', 200)}
			/>
		),
		{
			notes: 'Paid SLP invoice with no conflicting props',
		}
	);
