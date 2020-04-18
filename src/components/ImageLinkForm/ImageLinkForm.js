import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ''
		}
	}

	//1. Passes the user's input to the onInputChange prop in App.js
	//2. Changes this component's state to the user's input (which then appears in the searchfield)
	onHandleChange = (e) => {
	this.props.onInputChange(e);
	this.setState({url: e.target.value});
}

	//1. Calls the prop function which queries Clarifai
	//2. Resets the state to an empty string, which resets the searchfield (UX only)
	onHandleDetect = () => {
		this.props.onButtonSubmit();
		this.setState({url: ''});
	}

	//This makes sure that everything works if the user presses Enter instead of clicking the button
	onEnterPress = (e) => {
		if (e.key === 'Enter') {
			this.onHandleDetect();
		}
	}	


	render() {
		return (
			<div>
				<p>
					{'This magic brain will detect faces in your pictures. Give it a try'}
				</p>
				<div className='center'>
					<div className='form center pa4 br3 shadow-5'>
						<input 
							type="text" 
							value={this.state.url} 
							placeholder ='enter image url' 
							className='f4 pa2 w-70 center' 
							onChange={this.onHandleChange} 
							onKeyPress={this.onEnterPress} 
						/>
						<button 
							id='detect-button' 
							className='grow dib white bg-light-purple w-30 pa3 f4 link ph3 pv2' 
							onClick={this.onHandleDetect}
						>
							Detect
						</button>
					</div>
				</div>
			</div>
		)
	}			
}

export default ImageLinkForm;