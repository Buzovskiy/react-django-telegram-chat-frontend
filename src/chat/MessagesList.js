import React from 'react';
import Message from './Message';

class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.chatBoxBody = React.createRef();
    }

    componentDidMount() {
        this.scrollDown();
    }

    componentDidUpdate(){
        this.scrollDown();
    }

    scrollDown = () => {
        let chatBoxBody = this.chatBoxBody.current;
        if (chatBoxBody !== null) {
            let height = chatBoxBody.scrollHeight;
            chatBoxBody.scrollTo(0, height);
        }
        // chatBoxBody.scrollTo(0, height);
    }

    render() {
        const messages = this.props.messagesList.map((item, index) => {
            return <Message key={index} item={item} />;
        });
        return (
            <div ref={this.chatBoxBody} className="chatbox__body">{messages}</div>
        );
    }
}


export default MessagesList;
