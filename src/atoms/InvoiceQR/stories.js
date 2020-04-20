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
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				sizeQR={number('QR size', 125)}
				step={'fresh'}
				logoQR={text('logoQR', '')}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes:
				'Button is a stateful controlled component which is the primary visual indicator for the badger payment process',
		}
	)
	.add(
		'BCH Logo QR - all knobs',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				sizeQR={number('QR size', 125)}
				step={'fresh'}
				logoQR={text('logoQR', 'BCH')}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes:
				'Button is a stateful controlled component which is the primary visual indicator for the badger payment process',
		}
	)
	.add(
		'SLP Logo QR - all knobs',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				sizeQR={number('QR size', 125)}
				step={'fresh'}
				logoQR={text('logoQR', 'SLP')}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes:
				'Button is a stateful controlled component which is the primary visual indicator for the badger payment process',
		}
	)
	.add(
		'payment pending',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				step={'pending'}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes: 'Awaiting a confirmation or cancellation of Badger popup',
		}
	)
	.add(
		'payment complete',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				step={'complete'}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes: 'Payment received, at least on the front-end',
		}
	)
	.add(
		'login prompt',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				step={'login'}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes: 'user not logged in, prompt to login',
		}
	)
	.add(
		'install prompt',
		() => (
			<InvoiceQR
				toAddress={text(
					'To address',
					'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
				)}
				amountSatoshis={number('Satoshis', 550)}
				step={'install'}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes: 'Badger plugin not installed, prompt user to install Badger',
		}
	)
	.add(
		'expired',
		() => (
			<InvoiceQR
				paymentRequestUrl={text(
					'Invoice URL',
					// expired invoice
					'https://pay.bitcoin.com/i/Fz4AaMpzuSde9DgpFwDt13'
				)}
				step={'expired'}
			>
				<Text>{ButtonText}</Text>
			</InvoiceQR>
		),
		{
			notes: 'Shown for an expired BIP70 invoice',
		}
	);
