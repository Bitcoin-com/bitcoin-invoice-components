import styled from 'styled-components';
import colors from '../../styles/colors';

export const Wrapper = styled.div`
	display: inline-block;
`;
export const QRWrapper = styled.div`
	display: block;
	padding: 36px;
	margin: 0;
	font-family: Arial, sans-serif;
	background: ${colors.White};
	color: ${colors.VulcanLight};
	box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.1);
	border-radius: 16px;
	align-items: center;
	text-align: center;
`;
export const ButtonWrapper = styled.div`
	display: block;
`;

export const PriceBCH = styled.h3`
	color: ${colors.InvoiceGreen};
	margin: 4px 0;
`;

export const PriceFiat = styled.p`
	font-weight: bold;
	margin: 4px 0 12px 0;
	font-size: 14px;
	color: ${colors.VulcanLight};
`;

export const CopyButton = styled.button`
	color: #fff;
	background-color: ${colors.CaribbeanGreen};
	border: none;
	border-radius: 21px;
	display: block;
	width: 100%;
	padding: 12px;
	margin: 12px 0;
	font-size: 12px;
	cursor: pointer;
`;
