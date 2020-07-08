// @flow

import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
	getCurrencyPreSymbol,
	formatPriceDisplay,
	formatAmount,
} from '../../utils/badger-helpers';

import { type CurrencyCode } from '../../utils/currency-helpers';

import BadgerBase, {
	type ButtonStates,
	type BadgerBaseProps,
	type ValidCoinTypes,
} from '../../hoc/BadgerBase';

import InvoiceTimer from '../InvoiceTimer';
import InvoiceQR from '../../atoms/InvoiceQR';

import {
	Wrapper,
	QRWrapper,
	ButtonWrapper,
	PriceBCH,
	PriceFiat,
	CopyButton,
	LinkButton,
	CompleteButton,
} from './styled';

// Invoice Props
type Props = BadgerBaseProps & {
	coinSymbol: string,
	coinDecimals?: number,
	coinName?: string,

	invoiceInfo: ?Object,
	invoiceTimeLeftSeconds: ?number,
	invoiceFiat: ?number,

	handleClick: Function,
	step: ButtonStates,

	copyUri?: Boolean,
	linkAvailable?: Boolean,
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

			coinSymbol,
			coinDecimals,

			amount,
			paymentRequestUrl,

			invoiceTimeLeftSeconds,
			invoiceFiat,

			copyUri,
			linkAvailable,
			sizeQR,
		} = this.props;
		const { uriCopied } = this.state;
		const isComplete = step === 'complete';

		return (
			<React.Fragment>
				<Wrapper>
					<QRWrapper>
						<PriceBCH>{formatAmount(amount, coinDecimals)} BCH</PriceBCH>
						<PriceFiat>
							{getCurrencyPreSymbol(currency)} {formatPriceDisplay(invoiceFiat)}{' '}
							{currency}
						</PriceFiat>

						<InvoiceQR
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
						{linkAvailable && (
							<>
								{isComplete ? (
									<CompleteButton>PAID</CompleteButton>
								) : (
									<LinkButton onClick={handleClick}>PAY</LinkButton>
								)}
							</>
						)}
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
