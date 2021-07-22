import React from 'react';

class TypeMessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
    }

    state = { userMessage: '' };

    onChangeTextArea = async (e) => {
        await this.setState({ userMessage: e.target.value });
    }

    onClickChatButton = () => {
        if (this.state.userMessage.trim()){
            this.props.onSendMessage(this.state.userMessage.trim());
            this.setState({userMessage: ''});
        } else this.setState({userMessage: ''});
    }

    onKeyEnter = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {  // enter, return
            this.onClickChatButton();
        }
    }

    // document.querySelector('#chat-message-input').onkeyup = function(e) {
    //     if (e.keyCode === 13) {  // enter, return
    //         document.querySelector('#chat-message-submit').click();
    //     }
    // };

    render() {
        return (
            <div className="panel-footer">
                <div className="input-wrapper">
                    <textarea
                        ref={this.textAreaRef}
                        rows="3"
                        placeholder="Напишите сообщение"
                        className="chat_set_height"
                        value={this.state.userMessage}
                        onChange={this.onChangeTextArea}
                        onKeyUp={this.onKeyEnter}
                    ></textarea>
                    <span className="">
                        <button
                            className="send-message-btn fas fa-arrow-up"
                            id="btn-chat"
                            onClick={this.onClickChatButton}
                        ></button>
                    </span>
                </div>
            </div>
        );
    };
}

export default TypeMessageBar;