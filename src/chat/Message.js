import React from 'react';

// data = new Date();
// date.toLocaleTimeString()


const Message = (props) => {
    const side_class = props.item.sender === 'user' ? 'left' : 'right';
    return (
        <React.Fragment>
            <div className={"chatbox__body__message chatbox__body__message--" + side_class}>
                <div className="chatbox_timing">
                    <ul>
                        <li><span><i className="fa fa-calendar"></i> 22/11/2018</span></li>
                        <li><span><i className="fa fa-clock-o"></i> 7:00 PM</span></li>
                    </ul>
                </div>
                <img src="https://www.gstatic.com/webp/gallery/2.jpg" alt="Chat user" />
                <div className="clearfix"></div>
                <div className="ul_section_full">
                    <ul className="ul_msg">
                        <li className="person-name">Person Name</li>
                        <li>{props.item.message}</li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Message;