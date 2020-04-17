import React from 'react';
import './facerec.css';



const FaceRecognition = ({ imageUrl, boxes }) => {
	//Boxes is an array of coordinates of each individual bounding-box's coordinates
	//Create an array of style objects that 'draw' each individual bounding-box around the faces
	const boxesStyle = boxes.map(box => {
		return {
			position: 'absolute',
			top: box.topRow,
			right: box.rightCol,
			bottom: box.bottomRow,
			left: box.leftCol,
			boxShadow: '0 0 0 3px #149df2 inset',
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			cursor: 'pointer'
		}
	});

	return (
	<div className='center ma'>
		<div className='absolute mt2 parent'>
			<img id='imageinput' src={imageUrl} alt="" width='500px' height='auto'/>
			{boxesStyle.map((box, i) => {
				return(<div className='grow' style={box} key={i}></div>)
			})}
		</div>
	</div>	
	);
}


export default FaceRecognition;