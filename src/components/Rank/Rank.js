import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
	return (
		<div className='mt1 rank-container'>
			<div className='white name'>{`${name}, your current entry count is ...`}</div>
			<div className='white entries'>{entries}</div>
		</div>

	)
}

export default Rank;