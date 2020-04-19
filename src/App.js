import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';



//Parameters of the particles.js library
const particlesOptions = {
  particles: {
    number: {
      value: 170,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

//This allows to clear the state of the app after a user signs out
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }  
};

class App extends Component {
  constructor() {
  super();
  this.state = initialState;
}

componentDidMount() {
  fetch('https://guarded-castle-84804.herokuapp.com/')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

//1. Fetches the response from CLARIFAI for the image url 
//2. Updates user info 
//3. Displays the box on the image

onButtonSubmit = () => {

  //Make a request to the CLARIFAI api through our backend

  this.setState({imageUrl: this.state.input});
  fetch('https://guarded-castle-84804.herokuapp.com/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
      })
    })

  //The backend replies with the clarifai data

  .then(response => response.json())
  .then(response => { 
    if (response) {

      //Call the function that draws the box from the API's response

      this.calculateFaceLocation(response);

      //Increment the entry count
      
      fetch('https://guarded-castle-84804.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => this.setState(Object.assign(this.state.user, { entries: count})))
      .catch(console.log)
    }
  })
  .catch(err => console.log(err));    
}


//This function calculates the coordinates of the face from the response of the CLARIFAI API and passes them along
calculateFaceLocation = (response) => {

  // Retrieve each individual face location in an array from clarifai's response
  const facesInfo = response.outputs[0].data.regions.map(region => {
    return region.region_info.bounding_box
  })

  const image = document.getElementById('imageinput');
  const width = Number(image.width);
  const height = Number(image.height);

  //For each face, convert the 0 < coordinate < 1 that clarifai gives us to the corresponding values on the image
  const boxes = facesInfo.map(face => {
    return {
      topRow: face.top_row * height,
      leftCol: face.left_col * width,
      bottomRow: height - (face.bottom_row * height),
      rightCol: width - (face.right_col * width)
    }
  })

  //Pass those coordinates along to our Facerecognition component which will draw the boxes on the Document
  this.setState({boxes: boxes});
}


onInputChange = (e) => {
  this.setState({input: e.target.value});
}


onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if(route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

loadUser = (data) => {
  this.setState({ user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

resetImage = () => {
  this.setState({ imageUrl: '', input: ''})
}

  render() {
    const { isSignedIn, imageUrl, boxes, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo resetImage={this.resetImage}/>          
              <Rank name={ user.name } entries={ user.entries }/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes={ boxes } imageUrl={ imageUrl }/>
            </div>
          : (route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }  
      </div>
    )
  }
}

export default App;
