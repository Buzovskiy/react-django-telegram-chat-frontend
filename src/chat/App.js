// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'

class App extends React.Component {

	get telegram_chat_session_id() {
		let session_id = Cookies.get('telegram_chat_session_id');
		if (session_id) {
			return session_id
		} else {
			// Если нет куки телеграм чата, создаем
			session_id = `${Date.now()}_${Math.round(Math.random() * 100, 0)}`;
			document.cookie = "telegram_chat_session_id=" + session_id;
			return session_id;
		};
	}

	ws_url = `ws://127.0.0.1:8000/ws/website-chat/${this.telegram_chat_session_id}/`;
	chatSocket = new WebSocket(this.ws_url);

	// constructor(props) {
	// 	super(props);
	// 	// this.state = { lat: null, errorMessage: '' };
	// }

	state = { num: 0 };

	componentDidMount() {
		// window.navigator.geolocation.getCurrentPosition(
		// 	position => this.setState({ lat: position.coords.latitude }),
		// 	err => this.setState({ errorMessage: err.message })
		// );
		// Если сообщение приходит от сервера
		this.chatSocket.onmessage = (e) => {
			const data = JSON.parse(e.data);
			// console.log(this.state.num);
			console.log(data);
			this.setState({num: data.message});
			// document.querySelector('#chat-log').value += (data.message + '\n');
		};

		this.chatSocket.onclose = function (e) {
			console.error('Chat socket closed unexpectedly');
		};
		// setTimeout(()=>{
		// 	this.chatSocket.send(JSON.stringify({
		// 		'message': 'test-home'
		// 	}));
		// }, 3000)
	}

	// renderContent() {
	// 	// console.log(this.car);
	// 	// console.log(this.state.num);
	// 	if (this.state.errorMessage && !this.state.lat) {
	// 		return <p>Error: {this.state.errorMessage}</p>
	// 	}

	// 	if (!this.state.errorMessage && this.state.lat) {
	// 		return <SeasonDisplay lat={this.state.lat} num={this.state.num} />
	// 	}

	// 	return <Spinner message="please accept location request" />
	// }

	render() {
		return (
			<div style={{ border: 'solid 10px red' }}>
				{/* {this.renderContent()} */}
			</div>
		);
	}
}

export default App;
