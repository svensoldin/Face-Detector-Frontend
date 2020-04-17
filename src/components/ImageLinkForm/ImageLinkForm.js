import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className=''>
			<p>
				{'This magic brain will detect faces in your pictures. Give it a try'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input type="text" className='f4 pa2 w-70 center' onChange={onInputChange}/>
					<button className='grow dib white bg-light-purple w-30 pa3 f4 link ph3 pv2' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;