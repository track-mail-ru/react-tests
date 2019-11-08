import React from 'react';
import styles from './../static/styles/Profile.module.css';
import BaseForm from './../static/styles/BaseForm.module.css';

export function Profile(props) {
	let imageStyle = {
		backgroundImage: `url(${require('./../static/images/image.jpg')})`,
		backgroundSize: 'cover',
		backgroundPosition: 'cetner center',
		backgroundRepeat: 'no-repeat',
	};
	return (
		<div className={BaseForm.conteiner}>
			<div className={BaseForm.header}>
				<div className={BaseForm.menu} />
				<span className={BaseForm.formName}>Профиль</span>
			</div>
			<div className={BaseForm.content}>
				<div className={styles.topInfo}>
					<div className={styles.photo}>
						<div className={styles.userConteiner}>
							<div style={imageStyle} className={styles.image}></div>
							<div className={styles.loginConteiner}>
								<div className={styles.fullName}>Виталий Кисель</div>
								<div className={styles.status}>онлайн</div>
							</div>
						</div>
						<div className={styles.photoButton}>
							<div className={styles.phImage}></div>
						</div>
					</div>
					<div className={styles.info}></div>
				</div>
				<div className={styles.middleInfo}></div>
			</div>
		</div>
	);
}
