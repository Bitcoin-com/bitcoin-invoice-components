// @flow

import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react/dist/client/preview';
import { select, text, boolean, number } from '@storybook/addon-knobs';

import InvoiceQR from './InvoiceQR';
import Text from '../Text';

const ButtonText = 'Badger Pay';
const props = {
	toAddress: 'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g',
	amountSatoshis: 550,
};

storiesOf('InvoiceQR', module)
	.add(
		'default - all knobs',
		() => (
			<InvoiceQR
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/EW7ctYT2L88sY9RVfftmXQ'
				)}
				sizeQR={number('QR size', 200)}
				step={text('step', 'fresh')}
				coinSymbol={text('coinSymbol', 'BCH')}
			></InvoiceQR>
		),
		{
			notes:
				'Button is a stateful controlled component which is the primary visual indicator for the badger payment process',
		}
	)
	.add(
		'Paid',
		() => (
			<InvoiceQR
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/EW7ctYT2L88sY9RVfftmXQ'
				)}
				sizeQR={number('QR size', 200)}
				step={text('step', 'complete')}
				coinSymbol={text('coinSymbol', 'BCH')}
			></InvoiceQR>
		),
		{
			notes: 'Paid BIP70 Invoice',
		}
	)
	.add(
		'expired',
		() => (
			<InvoiceQR
				paymentRequestUrl={text(
					'Invoice URL',
					//'https://yourInvoiceUrlHere.com/String'
					'https://pay.bitcoin.com/i/EW7ctYT2L88sY9RVfftmXQ'
				)}
				sizeQR={number('QR size', 200)}
				step={text('step', 'expired')}
				coinSymbol={text('coinSymbol', 'BCH')}
			></InvoiceQR>
		),
		{
			notes: 'Expired BIP70 invoice',
		}
	);
