import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /[^/]+\/stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

addDecorator(withNotes);
addDecorator(withKnobs);

addParameters({
	options: {
		theme: {
			...themes.normal,
			colorSecondary: '#0AC18E',
			brandTitle: 'Badger Components React',
			brandUrl: 'https://www.npmjs.com/package/badger-components-react',
		},
	},
});

configure(loadStories, module);
