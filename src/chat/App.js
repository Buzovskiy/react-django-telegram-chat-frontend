// import logo from './logo.svg';
import './styles.scss';
import React from 'react';
// import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import MessagesList from './MessagesList';
import TypeMessageBar from './TypeMessageBar';
import translations from '../api/translations';

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

	ws_url = `${process.env.REACT_APP_CHAT_WEBSOCKET_BASE_URL}/ws/chat/${this.telegram_chat_session_id}/?language_code=${this.props.language_code}`;
	chatSocket = new WebSocket(this.ws_url);

	constructor(props) {
		super(props);
		this.chatboxRef = React.createRef();
	}

	state = {
		messagesList: [],
		translation: {},
	};

	componentDidMount() {
		translations.post(`${process.env.REACT_APP_CHAT_API_BASE_URL}/api/v1/chat/get-translations/`, {
			params : { language_code: this.props.language_code},
		})
		.then(response => {
			this.setState({translation: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});

		// window.navigator.geolocation.getCurrentPosition(
		// 	position => this.setState({ lat: position.coords.latitude }),
		// 	err => this.setState({ errorMessage: err.message })
		// );
		this.chatSocket.onopen = () => {
			// this.chatSocket.send(JSON.stringify({
			// 	lang: this.props.language_code,
			// }));
		}

		// Если сообщение приходит от сервера
		this.chatSocket.onmessage = this.handlerOnMessageFromWebsocket;

		this.chatSocket.onclose = function (e) {
			console.error('Chat socket closed unexpectedly');
		};
	}

	fields = {
		message: {},
		sender: {},
		unix_time: {},
	}

	handlerOnMessageFromWebsocket = e => {
		let messagesList = [...this.state.messagesList];
		const data = JSON.parse(e.data);
		if (data.hasOwnProperty('serverMessagesList')){
			messagesList.push(...data.serverMessagesList);
		}
		if (messagesList.length) this.setState({ messagesList: messagesList });



		// if (data.hasOwnProperty('history') && data.history.length){
		// 	let historyMessagesList = data.history.map(item => {
		// 		let newItem = JSON.parse(item), fields = {};
		// 		for (var field in this.fields) fields[field] = newItem[field];
		// 		return fields;
		// 	});
		// 	messagesList.push(...historyMessagesList);
		// } else if (data.hasOwnProperty('message') && data.message) {
		// 	let fields = {}
		// 	for (var field in this.fields) fields[field] = data[field];
		// 	messagesList.push(fields);
		// }
		// if (messagesList.length) this.setState({ messagesList: messagesList });
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

	onSend = (message) => {
		this.chatSocket.send(JSON.stringify({
			message: message,
			sender: 'user',
			site_domain: window.location.hostname,
			name: this.state.translation.you,
			surname: '',
			email: '',
			unix_time: Date.now()
		}));
	}

	render() {
		return (
			<div className="row">
				<div onTransitionEnd={this.handleChatboxTransitionEnd} ref={this.chatboxRef} className="chatbox chatbox22 chatbox--tray">
					<div className="chatbox__title" onClick={() => this.handleChatboxTitleClick()}>
						<h5><span>{this.state.translation.chat}</span></h5>
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
					<TypeMessageBar onSendMessage={this.onSend} translation={this.state.translation}/>
				</div>
			</div>
		);
	}
}

export default App;
