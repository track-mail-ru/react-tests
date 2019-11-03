import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import './../static/styles/ChatForm.css';

export function ChatForm(props) {
	return (
		<div className='chat-form'>
			<div className='header'>
			  	<div className={ 'headerButton backButton' }></div>
				<div className="nameConteiner">
				  	<div className="userImage" style="background: url(static/images/image.jpg) no-repeat center center; background-size: cover;"></div>
				  		<div className="userName">
				    		<div className="name">Виталий Кисель</div>
				    		<div className="status">в сети 5 минут назад</div>
				  		</div>
					</div>
				<div className={ 'headerButton searchButton' }></div>
				<div className={ 'headerButton optionsButton' }></div>
			</div>
			<div className='content'>
			  	<div className='messageWrap'>
			    	<DateMarker />
			  	</div>
			</div>
			<div className='footer'>
			  	<FormInput placeholder='Ваше сообщение' />
			</div>
		</div>
	);
}