import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = ({resetImage}) => {
	return (
		<div className='ma4 mt0 mb0 logo-container pointer' onClick={ () => resetImage() }>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }}>
	 			<div className="Tilt-inner pa3">
	 				<img style={{paddingTop: '7px'}}src={brain} alt='logo' />
	 			</div>
			</Tilt>
		</div>
	);
}


export default Logo;