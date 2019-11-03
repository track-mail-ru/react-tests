import React from 'react';
import './../static/styles/FormInput.css';

export function FormInput(props) {
	return (
		<div className='form-input'>
			<div className='inputButton additionalButton'></div>
			<input placeholder={ props.placeholder }/>
			<div className='inputButton sendButton'></div>
		</div>
	);
}