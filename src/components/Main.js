import React from 'react';
import { connect } from 'react-redux';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import Profile from './Profile';
import AuthForm from './AuthForm';
import styles from '../static/styles/Main.module.css';

import { chatLoader , checkAuth } from '../actions/chat';
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
			checkAuth_: props.checkAuth,
			isAuth: false,
			isLoad: false,
		};
	}

	componentDidMount() {
		const {
			chatLoader_,
			getEvents_,
			checkAuth_,
		} = this.state;

		console.log('Loading...');

		checkAuth_(() => {
			this.setState({ isAuth: true });

			chatLoader_(() => {
				setInterval(() => {
					getEvents_();
				}, 800);
			});

			console.log('Load сomplete!');
		}, () => {
			console.log('Auth error');
			return false;
		});
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

	disloadAuthForm() {
		const { setFrameStyle_ } = this.state;

		setFrameStyle_('AuthForm', {
			animationName: styles.chatDisapear,
		});

		this.setState({
			isLoad: true,
		});
	}

	myRouter() {
		const { pathname } = this.props.location;
		const {
			isAuth,
			isLoad,
		} = this.state;

		if (!isLoad && isAuth) { this.disloadAuthForm(); }

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
				<AuthForm/>
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
	checkAuth,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main);

