// @flow

import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
	getCurrencyPreSymbol,
	formatPriceDisplay,
	formatAmount,
} from '../../utils/badger-helpers';

import { type CurrencyCode } from '../../utils/currency-helpers';

import BitcoinCashImage from '../../images/bitcoin-cash.svg';
import SLPLogoImage from '../../images/slp-logo.png';

import BadgerBase, {
	type ButtonStates,
	type BadgerBaseProps,
	type ValidCoinTypes,
} from '../../hoc/BadgerBase';

import PriceDisplay from '../PriceDisplay';
import InvoiceTimer from '../InvoiceTimer';

import InvoiceQR from '../../atoms/InvoiceQR';
import Small from '../../atoms/Small';

import {
	Wrapper,
	QRWrapper,
	ButtonWrapper,
	PriceBCH,
	PriceFiat,
	CopyButton,
} from './styled';

// Badger Button Props
type Props = BadgerBaseProps & {
	coinSymbol: string,
	coinDecimals?: number,
	coinName?: string,

	invoiceInfo: ?Object,
	invoiceTimeLeftSeconds: ?number,
	invoiceFiat: ?number,

	handleClick: Function,
	step: ButtonStates,

	copyUri?: string,
	sizeQR: ?number,
};

type State = {
	uriCopied: boolean,
};

class Invoice extends React.PureComponent<Props, State> {
	handleCopiedUri = this.handleCopiedUri.bind(this);
	uriCopiedTimeout = this.uriCopiedTimeout.bind(this);
	state = {
		uriCopied: false,
	};

	handleCopiedUri() {
		this.setState({ uriCopied: true }, this.uriCopiedTimeout());
	}
	uriCopiedTimeout() {
		setTimeout(() => {
			this.setState({
				uriCopied: false,
			});
		}, 3000);
	}

	render() {
		const {
			to,
			step,
			handleClick,

			currency,
			price,

			coinType,
			coinSymbol,
			coinDecimals,
			coinName,

			amount,
			paymentRequestUrl,

			invoiceInfo,
			invoiceTimeLeftSeconds,
			invoiceFiat,

			copyUri,
			sizeQR,
		} = this.props;
		const { uriCopied } = this.state;

		const CoinImage = coinType === 'BCH' ? BitcoinCashImage : SLPLogoImage;

		// buttonPriceDisplay -- handle different cases for BIP70 invoices

		// buttonPriceDisplay if no price, or if a bip70 invoice is set from a server without supported websocket updates
		let buttonPriceDisplay = <p>Badger Pay</p>;

		// buttonPriceDisplay of price set in props and no invoice is set
		if (price && !paymentRequestUrl) {
			buttonPriceDisplay = (
				<p>
					{getCurrencyPreSymbol(currency)} {formatPriceDisplay(price)}
					<Small> {currency}</Small>
				</p>
			);
			// buttonPriceDisplay if valid bip70 invoice with price information is available
		} else if (paymentRequestUrl && invoiceFiat != undefined) {
			buttonPriceDisplay = (
				<p>
					{getCurrencyPreSymbol(currency)} {formatPriceDisplay(invoiceFiat)}
					<Small> {currency}</Small>
				</p>
			);
		}

		let determinedShowAmount = (
			<PriceDisplay
				coinType={coinType}
				price={formatAmount(amount, coinDecimals)}
				symbol={coinSymbol}
				name={coinName}
			/>
		);
		if (paymentRequestUrl && !invoiceInfo.currency) {
			determinedShowAmount = <p>BIP70 Invoice</p>;
		}
		return (
			<React.Fragment>
				<Wrapper>
					<QRWrapper>
						<PriceBCH>{formatAmount(amount, coinDecimals)} BCH</PriceBCH>
						<PriceFiat>
							{getCurrencyPreSymbol(currency)} {formatPriceDisplay(invoiceFiat)}
						</PriceFiat>

						<InvoiceQR
							amountSatoshis={amount}
							toAddress={to}
							onClick={handleClick}
							step={step}
							paymentRequestUrl={paymentRequestUrl}
							sizeQR={sizeQR}
							coinSymbol={coinSymbol}
						></InvoiceQR>

						{invoiceTimeLeftSeconds !== null && (
							<InvoiceTimer invoiceTimeLeftSeconds={invoiceTimeLeftSeconds} />
						)}
					</QRWrapper>
					<ButtonWrapper>
						{copyUri && (
							<CopyToClipboard
								text={`bitcoincash:?r=${paymentRequestUrl}`}
								onCopy={this.handleCopiedUri}
							>
								<CopyButton>{uriCopied ? 'URI COPIED' : 'COPY URI'}</CopyButton>
							</CopyToClipboard>
						)}
					</ButtonWrapper>
				</Wrapper>
			</React.Fragment>
		);
	}
}

export default BadgerBase(Invoice);
