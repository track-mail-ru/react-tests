import React from 'react';
import { connect } from 'react-redux';
import styles from '../static/styles/City.module.css';

import { addNewID, removeID } from '../actions/state';

function City(props) {
	const {
		addNewID,
		removeID,
		name,
		ID,
		IDs,
	} = props;

	let span = <span
		className={styles.remove}
		onClick={() => { removeID(ID); }}
	>x</span>;

	if (IDs.indexOf(ID) === -1) {
		span = <span
			className={styles.add}
			onClick={() => { addNewID(ID); }}
		>+</span>;
	}

	return (
		<div className={styles.block}>
			<span className={styles.name}>{name}</span>
			{ span }
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	IDs: state.state.IDs,
	...props,
}); 

const mapDispatchToProps = {
	addNewID,
	removeID,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(City);