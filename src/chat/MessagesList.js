import React from 'react';
import Message from './Message';

const MessagesList = (props) => {
    const messages = props.messagesList.map((item, index) => {
        return (
            <div key={index}>{item.message}</div>
        );
    });
    return (
        <div className="chatbox__body">{messages}</div>
    );
}

export default MessagesList;
