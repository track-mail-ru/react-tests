import React from 'react';
import { connect } from 'react-redux';
import styles from '../static/styles/AuthForm.module.css';
import BaseForm from '../static/styles/BaseForm.module.css';
import { URL_REQUEST } from '../constants/helperConstant';

function AuthForm(props) {
	const {
		style
	} = props;

	return (
		<div style={style} className={`${BaseForm.conteiner} ${styles.wrap}`}>
			<div className={`${BaseForm.content} ${styles.content}`}>
				<div className={styles.authForm}>
					<span className={styles.logo}>Shadow Chat</span>
					<ul className={styles.buttons}>
						<a href={`${URL_REQUEST}/social_auth/login/vk-oauth2/`}>
							<li className={`${styles.button} ${styles.vk}`}>
								ВКонтакте
							</li>
						</a>
						<li className={`${styles.button} ${styles.face}`}>
							Facebook
						</li>
						<li className={`${styles.button} ${styles.inst}`}>
							Instagram
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	style: state.globalState.state.frameStyles.AuthForm,
	...props,
});

export default connect(
	mapStateToProps,
	null,
)(AuthForm);
