import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	constructor(props) {
		super(props); //extends React.Component, this base class has a constructor that we override here

		//initialize state object
		this.state = {lat: null, errorMessage: '' }; //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state

	
}


	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
		position => this.setState({ lat: position.coords.latitude }),
		err => this.setState({ errorMessage: err.message }) 
		);
	}

	renderContent(){
		//if error and no lat
		if(this.state.errorMessage && !this.state.lat){
			return <div>Error: {this.state.errorMessage}</div>
		}

		//if no error and latitude
		if(!this.state.errorMessage && this.state.lat){
			return <SeasonDisplay lat={this.state.lat} />
		}

		return <Spinner message="Please accept location request"/>;
	}

	//Requirement to define render in React for each component
	render() { //Creates new class with one method render() React.Component allows us to borrow functionality or subclassing React.Component
		return <div className="border red">{this.renderContent()}</div>;
		
	}
}


ReactDOM.render(<App />,document.querySelector('#root'));

