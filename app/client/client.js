import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Root } from 'app/common/spec';

const rootElement = document.getElementById('content');

render(<Root/>, rootElement);
