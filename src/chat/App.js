// import logo from './logo.svg';
import './styles.scss';
import React from 'react';
// import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import MessagesList from './MessagesList';
import TypeMessageBar from './TypeMessageBar';

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

	constructor(props) {
		super(props);
		this.chatboxRef = React.createRef();
	}

	/**
	 * Handler for showing or hiding chat window
	 */
	handleChatboxTitleClick() {
		this.chatboxRef.current.classList.toggle('chatbox--tray');
	}

	/**
	 * Handler for closing chat window
	 */
	handleChatboxCloseClick = () => {
		this.chatboxRef.current.classList.toggle('chatbox--closed');
	}

	/**
	 * Handler for transtion end for chatbox window
	 */
	handleChatboxTransitionEnd = () => {
		if (this.chatboxRef.current.classList.contains('chatbox--closed')) {
			this.chatboxRef.current.remove();
		}
	}

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
			this.setState({ num: data.message });
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

	// renderMessagesList() {
	// 	const messages = this.state.messagesList.map((item, index) => {
	// 		return (
	// 			<div key={index}>{item.message}</div>
	// 		)
	// 	})
	// 	return (
	// 		<React.Fragment>
	// 			{messages}
	// 		</React.Fragment>
	// 	)
	// }

	state = {
		num: 0,
		messagesList: [
			{ 'message': 'user message1', 'sender': 'user' },
			{ 'message': 'manager message1', 'sender': 'manager' },
			{ 'message': 'user message2', 'sender': 'user' },
			{ 'message': 'manager message2', 'sender': 'manager' },
			{ 'message': 'user message3', 'sender': 'user' },
		]
	};

	onSend = (message) => {
		this.setState({messagesList: [...this.state.messagesList, {'message': message, 'sender': 'user'}]});
	}

	render() {
		return (
			<div className="row">
				<div onTransitionEnd={this.handleChatboxTransitionEnd} ref={this.chatboxRef} className="chatbox chatbox22 chatbox--tray">
					<div className="chatbox__title" onClick={() => this.handleChatboxTitleClick()}>
						<h5><span>Leave a message</span></h5>
						{/* <button className="chatbox__title__tray">
							<span></span>
						</button> */}
						<button className="chatbox__title__close" onClick={this.handleChatboxCloseClick}>
							<span>
								<svg viewBox="0 0 12 12" width="12px" height="12px">
									<line stroke="#FFFFFF" x1="11.75" y1="0.25" x2="0.25" y2="11.75"></line>
									<line stroke="#FFFFFF" x1="11.75" y1="11.75" x2="0.25" y2="0.25"></line>
								</svg>
							</span>
						</button>
					</div>
					<MessagesList messagesList={this.state.messagesList} />
					<TypeMessageBar onSendMessage={this.onSend} />
				</div>
			</div>
		);
	}
}

export default App;
