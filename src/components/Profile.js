import React from 'react';
import { InfoInput } from './InfoInput';
import styles from '../static/styles/Profile.module.css';
import BaseForm from '../static/styles/BaseForm.module.css';

export function Profile(props) {
	const {
		style,
	} = props;

	const imageStyle = {
		backgroundImage: `url(${require('./../static/images/image.jpg')})`,
		backgroundSize: 'cover',
		backgroundPosition: 'cetner center',
		backgroundRepeat: 'no-repeat',
	};
	return (
		<div className={styles.conteiner} style={style}>
			<div className={BaseForm.header}>
				<div className={BaseForm.menu} />
				<span className={BaseForm.formName}>Профиль</span>
			</div>
			<div className={BaseForm.content}>
				<div className={styles.topInfo}>
					<div className={styles.photo}>
						<div className={styles.userConteiner}>
							<div style={imageStyle} className={styles.image} />
							<div className={styles.loginConteiner}>
								<div className={styles.fullName}>Виталий Кисель</div>
								<div className={styles.status}>онлайн</div>
							</div>
						</div>
						<div className={styles.photoButton}>
							<div className={styles.phImage} />
						</div>
					</div>
					<div className={styles.info}>
						<InfoInput 
							className={styles.InfoInput}
							placeholder='Никнейм' 
							value='@jellyb0y'
							onChange={null} 
						/>
						<InfoInput 
							className={styles.InfoInput}
							placeholder='Почта' 
							value='test@mail.ru'
							onChange={null} 
						/>
						<InfoInput 
							className={styles.InfoInput}
							placeholder='О себе' 
							value='Разработчик этого приложения'
							onChange={null} 
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
