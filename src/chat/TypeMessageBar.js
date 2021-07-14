import React from 'react';

class TypeMessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = { userMessage: '' };

    onChangeTextArea = async (e) => {
        await this.setState({ userMessage: e.target.value });
    }

    onClickChatButton = () => {
        this.props.onSendMessage(this.state.userMessage);
    }

    render() {
        return (
            <div className="panel-footer">
                <div className="input-group">
                    <textarea
                        rows="3"
                        placeholder="Type message"
                        className="form-control input-sm chat_set_height"
                        value={this.state.userMessage}
                        onChange={this.onChangeTextArea}
                    ></textarea>
                    <span className="input-group-btn">
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