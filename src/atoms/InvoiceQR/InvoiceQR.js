// @flow

import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

import QRCode from 'qrcode.react';
import Lottie from 'lottie-react-web';

import { type ButtonStates } from '../../hoc/BadgerBase';
import colors from '../../styles/colors';

import bchLogo from '../../images/bch-icon-qrcode.png';
import slpLogo from '../../images/slp-logo-2.png';
import CheckSVG from '../../images/CheckSVG';
import XSVG from '../../images/XSVG';
import LoadSVG from '../../images/LoadSVG';
import InvoicePaid from '../../images/InvoicePaid.json';

import Text from '../Text';

// May not need this wrapper.
const Wrapper = styled.div`
	display: inline-block;
`;

const Main = styled.div`
	display: grid;
	position: relative;
`;

const QRCodeWrapper = styled.div`
	padding: 12px 12px 9px;
	border-radius: 5px 5px 0 0;
	border-bottom: none;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const A = styled.a`
	color: inherit;
	text-decoration: none;
`;

const cover = css`
	position: absolute;
	border-radius: 0 0 5px 5px;
	top: 0;
	bottom: 9px;
	right: 0;
	left: 0;
	font-size: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
`;

const PendingCover = styled.div`
	${cover};
	border: 1px solid ${colors.CaribbeanGreen};
	border-radius: 5px;
	background-color: ${colors.CaribbeanGreen};
`;

const CompleteCover = styled.div`
	${cover};
	border-radius: 5px;
	border: 1px solid ${colors.success700};
	background-color: ${colors.success500};
`;

const ExpiredCover = styled.div`
	${cover};
	border-radius: 5px;
	border: 1px solid ${colors.expired700};
	background-color: ${colors.expired500};
`;

const PaidCover = styled.div`
	${cover};
	flex-direction: column;
	color: ${colors.InvoiceGreen};
	background-color: #fff;
`;

const PaidText = styled.p`
	font-size: 20px;
	font-weight: bold;
	color: ${colors.InvoiceGreen};
	margin: 0px;
`;

const spinAnimation = keyframes`
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
`;
const CheckContainer = styled.div``;

const PendingSpinner = styled.div`
	animation: ${spinAnimation} 3s linear infinite;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DesktopCover = styled.div`
	@media screen and (max-width: 768px) {
		display: none;
	}
	position: absolute;
	border-radius: 5px;
	top: 12px;
	left: 12px;
	z-index: 2;
	background-color: transparent;
`;

type Props = {
	step: ButtonStates,
	children: React.Node,
	toAddress: string,
	amountSatoshis: ?number,
	sizeQR: number,
	paymentRequestUrl: string,
	coinType: string,
};

class InvoiceQR extends React.PureComponent<Props> {
	static defaultProps = {
		sizeQR: 200,
		paymentRequestUrl: 'https://pleaseEnterBip70Url/',
		coinSymbol: null,
	};

	render() {
		const {
			children,
			step,
			toAddress,
			amountSatoshis,
			sizeQR,
			paymentRequestUrl,
			coinType,
		} = this.props;

		const widthQR = sizeQR >= 75 ? sizeQR : 75; // Minimum width 75

		// QR code source
		const uriBase = toAddress;

		let uri = amountSatoshis
			? `${uriBase}?amount=${amountSatoshis / 1e8}`
			: uriBase;

		if (paymentRequestUrl && paymentRequestUrl.length > 0) {
			if (coinType === 'BCH') {
				uri = `bitcoincash:?r=${paymentRequestUrl}`;
			} else {
				uri = `simpleledger:?r=${paymentRequestUrl}`;
			}
		} else uri = `bitcoincash:?r=https://pleaseEnterBip70Url/`;

		// State booleans
		const isFresh = step === 'fresh';
		const isPending = step === 'pending';
		const isComplete = step === 'complete';
		const isExpired = step === 'expired';
		const isLogin = step === 'login';
		const isInstall = step === 'install';

		let logoSize = Math.round((42 / 200) * sizeQR);
		if (logoSize > 66) {
			logoSize = 66;
		}

		return (
			<Wrapper>
				<Main>
					{isPending && (
						<PendingCover>
							<PendingSpinner>
								<LoadSVG />
							</PendingSpinner>
						</PendingCover>
					)}
					{isComplete && (
						<PaidCover>
							<Lottie
								options={{
									animationData: InvoicePaid,
									loop: false,
								}}
							/>
							<PaidText>Payment Complete</PaidText>
						</PaidCover>
					)}
					{isExpired && (
						<ExpiredCover>
							<XSVG />
						</ExpiredCover>
					)}

					<QRCodeWrapper>
						<DesktopCover style={{ width: widthQR, height: widthQR + 4 }} />

						<QRCode
							value={uri}
							size={widthQR}
							renderAs={'svg'}
							level="M"
							imageSettings={{
								src: coinType === 'BCH' ? bchLogo : slpLogo,
								x: null,
								y: null,
								height: logoSize,
								width: logoSize,
								excavate: false,
							}}
						/>
					</QRCodeWrapper>
				</Main>
			</Wrapper>
		);
	}
}

export default InvoiceQR;
