import React from 'react';
import styles from '../static/styles/FormInput.module.css';
import docImg from '../static/images/docImg.png';
import geoImg from '../static/images/geoImg.png';

export function FormInput(props) {
	const { 
		placeholder,
		formEntered
	} = props;

	const input = React.useRef(null);
	const doc = React.useRef(null);
	const img = React.useRef(null);
	const [menuStyle, setMenuStyle] = React.useState(null);
	const [additions, setAdditions] = React.useState(null);
	let additionsBoxStyles = null;
	let list = null;

	const onSubmit = () => {
		const value = input.current.value.trim();
		if (value !== '' || additions) {
			input.current.value = '';
			formEntered(value, additions);
			setAdditions(null);
		}
	};

	const onKeyPress = (event) => {
		if (event.charCode === 13) {
			onSubmit();
		}
	};

	const onFillImg = (event) => {
		let additionsList = event.target.files;
		if (!additionsList.length) { return false; }

		let flag = false;
		additionsList = [...additionsList].map((file) => {
			if (file.size > 5 * 1024 * 1024) { flag = true }
			return {
				name: file.name, 
				path: window.URL.createObjectURL(file),
			}
		});

		if (flag) {
			return false; // Поставить вывод ошибок
		}

		if (additions) { additionsList = [...additions.list, ...additionsList]; }
		if (additionsList.length > 10 || (additions && additions.type !== 'images')) {
			return false;
		}

		setAdditions({
			type: 'images',
			list: additionsList,
		});
	};

	const onFillDoc = (event) => {
		let additionsList = event.target.files;
		if (!additionsList.length) { return false; }

		let flag = false;
		additionsList = [...additionsList].map((file) => {
			if (file.size > 5 * 1024 * 1024) { flag = true }
			return {
				name: file.name, 
				path: window.URL.createObjectURL(file),
			}
		});

		if (flag) {
			return false; // Поставить вывод ошибок
		}

		if (additions) { additionsList = [...additions.list, ...additionsList]; }
		if (additionsList.length > 10 || (additions && additions.type !== 'documents')) {
			return false;
		}

		setAdditions({
			type: 'documents',
			list: additionsList,
		});
	};

	const removeFile = (i) => {
		let additionsList = additions.list;
		additionsList.splice(i, 1);
		if (additionsList.length) {
			setAdditions({
				type: additions.type,
				list: additionsList,
			});
		} else { setAdditions(null); }
	};

	const geoLocation = () => {
		if ('geolocation' in navigator) {
			var geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000,
			}; 

			navigator.geolocation.getCurrentPosition((pos) => {
				let latitude = pos.coords.latitude;
				let longitude = pos.coords.longitude;

				setAdditions({
					type: 'geolocation',
					list: [{
						name: 'Геопозиция',
						path: `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=15`,
					}],
				});
			}, console.log, geoOptions);
		} else {
			return false; // Заменить на ошибку
		}
	};

	if (additions) {
		additionsBoxStyles = {
			height: '100px',
		};

		list = additions.list.map((file, i) => {
			let addStyle = {
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				height: '65px',
			};

			switch (additions.type) {
				case 'images':
					addStyle['backgroundImage'] = `url(${file.path})`;
					break;
				case 'documents':
					addStyle['backgroundImage'] = `url(${docImg})`;
					break;
				case 'geolocation':
					addStyle['backgroundImage'] = `url(${geoImg})`;
					break;
				default:
					break;
			}

			return (<li key={i}>
				<div onClick={removeFile.bind(null, i)} className={styles.remove}>-</div>
				<div style={addStyle} className={styles.image} />
				<span className={styles.imageName}>{file.name}</span>
			</li>);
		});
	}

	return (
		<div className={styles.wrap}>
			<div style={additionsBoxStyles} className={styles.additionsBox}>
				<ul className={styles.additionsBoxUl}>{list}</ul>
			</div>
			<div className={styles.formInput}>
				<div onClick={() => {
					setMenuStyle({
						height: '120px',
						boxShadow: '0 0 60px 10px #151716',
					});
				}} className={`${styles.inputButton} ${styles.additionalButton}`} />
				<input type='text' onKeyPress={onKeyPress} ref={input} placeholder={placeholder} />
				<div
					onClick={onSubmit}
					className={`${styles.inputButton} ${styles.sendButton}`}
				/>
			</div>
			<div style={menuStyle} className={styles.menu}>
					<ul>
						<li onClick={() => {
							setMenuStyle(null);
							img.current.click(); 
						}}>
							<div className={`${styles.menuButton} ${styles.menuImage}`} />
							<span className={styles.span}>изображение</span>
							<input onChange={onFillImg} ref={img} type='file' multiple style={{display: 'none'}} accept='image/*'/>
						</li>
						<li onClick={() => {
							setMenuStyle(null);
							doc.current.click();
						}}>
							<div className={`${styles.menuButton} ${styles.menuDocument}`} />
							<span className={styles.span}>документ</span>
							<input onChange={onFillDoc} ref={doc} type='file' multiple style={{display: 'none'}} />
						</li>
						<li onClick={() => {
							setMenuStyle(null);
							geoLocation();
						}}>
							<div className={`${styles.menuButton} ${styles.menuGeo}`} />
							<span className={styles.span}>геолокация</span>
						</li>
					</ul>
				</div>
		</div>
	);
}
