// @flow

import * as React from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import colors from '../../styles/colors';

const TimeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const TimeText = styled.div`
	font-family: Arial, sans-serif;
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	padding-left: 8px;
	color: ${({ alert = false }) =>
		alert === true ? 'red' : colors.VulcanLight};
`;

const ProgressHolder = styled.div`
	width: 16px;
`;

const CustomCircularProgressbar = styled(CircularProgressbar)`
	/*
 * react-circular-progressbar styles
 * All of the styles in this file are configurable!
 */

	.CircularProgressbar {
		/*
   * This fixes an issue where the CircularProgressbar svg has
   * 0 width inside a "display: flex" container, and thus not visible.
   */
		width: 100%;
		/*
   * This fixes a centering issue with CircularProgressbarWithChildren:
   * https://github.com/kevinsqi/react-circular-progressbar/issues/94
   */
		vertical-align: middle;
	}

	.CircularProgressbar .CircularProgressbar-path {
		stroke: #3e98c7;
		stroke-linecap: round;
		transition: stroke-dashoffset 0.5s ease 0s;
	}

	.CircularProgressbar .CircularProgressbar-trail {
		stroke: #d6d6d6;
		/* Used when trail is not full diameter, i.e. when props.circleRatio is set */
		stroke-linecap: round;
	}

	.CircularProgressbar .CircularProgressbar-text {
		fill: #3e98c7;
		font-size: 20px;
		dominant-baseline: middle;
		text-anchor: middle;
	}

	.CircularProgressbar .CircularProgressbar-background {
		fill: #d6d6d6;
	}

	/*
 * Sample background styles. Use these with e.g.:
 *
 *   <CircularProgressbar
 *     className="CircularProgressbar-inverted"
 *     background
 *     percentage={50}
 *   />
 */
	.CircularProgressbar.CircularProgressbar-inverted
		.CircularProgressbar-background {
		fill: #3e98c7;
	}

	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
		fill: #fff;
	}

	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
		stroke: #fff;
	}

	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
		stroke: transparent;
	}
	.CircularProgressbar-path {
		stroke: #2fa9ee !important;
	}
	.CircularProgressbar-trail {
		stroke: #e5e8f0 !important;
	}
	.CircularProgressbar-text {
		fill: #0ac18e !important;
	}
`;

// Invoice Timer

// Turn red if less than 1:00 left
// align right so alignment doesn't change when time goes from 10:00 to 9:59
// Only render if the invoice is active; not paid or expired
type Props = {
	invoiceTimeLeftSeconds: ?number,
};

class InvoiceTimer extends React.PureComponent<Props> {
	render() {
		const { invoiceTimeLeftSeconds } = this.props;

		const timeLeftMinutes = Math.floor(invoiceTimeLeftSeconds / 60);
		const remainderSeconds = invoiceTimeLeftSeconds % 60;

		const formattedMinutes = `${timeLeftMinutes}`.padStart(2, '0');
		const formattedSeconds = `${remainderSeconds}`.padStart(2, '0');
		const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
		const isAlert = timeLeftMinutes < 1;
		const countdownProgress = Math.round(
			100 * (invoiceTimeLeftSeconds / (15 * 60))
		);

		return (
			<TimeWrapper>
				<ProgressHolder>
					<CustomCircularProgressbar
						value={countdownProgress}
						maxValue={100}
						counterClockwise
					/>
				</ProgressHolder>
				<TimeText alert={isAlert}>{formattedTime}</TimeText>
			</TimeWrapper>
		);
	}
}

export default InvoiceTimer;
