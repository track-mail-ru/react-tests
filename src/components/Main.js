import React from 'react';
import { connect } from 'react-redux';
import { InitializeRecordStream } from '../lib/InitializeRecordStrem';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import { Profile } from './Profile';
import Parent from './Parent.Context';
import styles from '../static/styles/Main.module.css';

import { chatLoader, updateChat } from '../actions/chat';
import { getEvents, deleteEvents} from '../actions/events';
import { updateState } from '../actions/globalState';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chatLoader_: props.chatLoader,
			getEvents_: props.getEvents,
			updateState_: props.updateState,

			mediaRecorder: null,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
				Profile: null,
			},
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

	async requireRecorder() {
		if (this.state.mediaRecorder) {
			return this.state.mediaRecorder;
		}

		return InitializeRecordStream().then((value) => {
			this.setState({mediaRecorder: value});
			return value;
		}).catch((err) => {
			throw new Error(err);
		});
	}

	apearFrame(framename, newState = null) {
		let { state } = this;
		state.frameStyles[framename] = {
			animationName: styles.chatApear,
		};

		if (newState && newState instanceof Object) {
			state = Object.assign(state, newState);
		}

		if (state !== this.state) {
			this.setState(state);
		}
	}

	disapearFrame(framename = null) {
		const { state } = this;

		const style = {
			animationName: styles.chatDisapear,
		};

		if (!framename) {
			const { frameStyles } = state;
			for (const frame in frameStyles) {
				if (frameStyles[frame]) {
					frameStyles[frame] = style;
				}
			}
			state.frameStyles = frameStyles;
		} else if (state.frameStyles[framename]) {
			state.frameStyles[framename] = style;
		}

		if (state !== this.state) {
			this.setState(state);
		}
	}

	myRouter() {
		const { pathname } = this.props.location;
		switch (true) {
			case /chat\/\d+\/?$/.test(pathname):
				const chatID = parseInt(pathname.match(/\d+/));
				this.state.updateState_({
					activeChat: chatID,
				});
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

		const {
			activeChat,
			frameStyles
		} = this.state;

		return (
			<Parent.Provider value={this}>
				<div className={styles.wrap}>
					<ChatList style={frameStyles.ChatList} />
					<ChatForm
						style={frameStyles.ChatForm}
						activeChat={activeChat}
					/>
					<Profile style={frameStyles.Profile} />
				</div>
			</Parent.Provider>
		);
	}
}

const mapDispatchToProps = {
	chatLoader,
	getEvents,
	updateState,
};

export default connect(
	null,
	mapDispatchToProps,
)(Main);

