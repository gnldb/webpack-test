import _ from 'lodash';
import  './style.css';
import  './hello.scss';

function component() {
	let element = document.createElement('div');

	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	return element;
}

document.body.appendChild(component());

console.log('hello webpack dev server');