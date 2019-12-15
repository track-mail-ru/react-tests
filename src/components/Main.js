import React from 'react';
import { connect } from 'react-redux';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import Profile from './Profile';
import styles from '../static/styles/Main.module.css';

import { chatLoader } from '../actions/chat';
import { getEvents } from '../actions/events';
import { updateState, setFrameStyle } from '../actions/globalState';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatLoader_: props.chatLoader,
			getEvents_: props.getEvents,
			updateState_: props.updateState,
			setFrameStyle_: props.setFrameStyle,
			frameStyles: props.frameStyles,
		};
	}

	componentDidMount() {
		const {
			chatLoader_,
			getEvents_,
		} = this.state;

		console.log('Loading...');

		chatLoader_(() => {
			setInterval(() => {
				getEvents_();
			}, 800);
		});

		console.log('Load сomplete!');
	}

	apearFrame(framename, newState = null) {
		const {
			updateState_,
			setFrameStyle_,
		} = this.state;

		if (newState) {
			updateState_(newState);
		}

		setFrameStyle_(framename, {
			animationName: styles.chatApear,
		});
	}

	disapearFrame(framename = null, newState = null) {
		const {
			updateState_,
			setFrameStyle_,
			frameStyles,
		} = this.state;

		if (newState) {
			updateState_(newState);
		}

		if (!framename) {
			Object.keys(frameStyles).forEach((name) => {
				if (frameStyles[name]) {
					setFrameStyle_(name, {
						animationName: styles.chatDisapear,
					});
				}
			});
		} else {
			setFrameStyle_(framename, {
				animationName: styles.chatDisapear,
			});
		}
	}

	myRouter() {
		const { pathname } = this.props.location;
		switch (true) {
			case /chat\/\d+\/?$/.test(pathname):
				const chatID = parseInt(pathname.match(/\d+/));
				this.apearFrame('ChatForm', {
					activeChat: chatID,
				});
				break;
			case /profile\/?/.test(pathname):
				this.apearFrame('Profile');
				break;
			default:
				this.disapearFrame();
				break;
		}
	}

	render() {
		this.myRouter();

		return (
			<div className={styles.wrap}>
				<ChatList/>
				<ChatForm/>
				<Profile/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	frameStyles: state.globalState.state.frameStyles,
	...props,
}); 

const mapDispatchToProps = {
	chatLoader,
	getEvents,
	updateState,
	setFrameStyle,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main);

