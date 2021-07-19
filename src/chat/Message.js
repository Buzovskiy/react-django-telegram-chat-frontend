import React from 'react';

// data = new Date();
// date.toLocaleTimeString()

const getUserImage = props => {
    if (props.item.image_src){
        return <img src={props.item.image_src} alt="Chat user" />
        // https://www.gstatic.com/webp/gallery/2.jpg
    }
    return <div className="default-image"><span className="fas fa-user"></span></div>
}

const Message = (props) => {
    const side_class = props.item.sender === 'user' ? 'left' : 'right';
    const message_time = unix_time_converter(props.item.unix_time);
    return (
        <React.Fragment>
            <div className={"chatbox__body__message chatbox__body__message--" + side_class}>
                <div className="chatbox_timing">
                    <ul>
                        <li><span><i className="fa fa-calendar"></i>{message_time.dmy}</span></li>
                        <li><span><i className="fa fa-clock-o"></i> {message_time.hms}</span></li>
                    </ul>
                </div>
                <div>{getUserImage(props)}</div>
                <div className="clearfix"></div>
                <div className="ul_section_full">
                    <ul className="ul_msg">
                        <li className="person-name">
                            {(props.item.name+' '+props.item.surname).trim()}:
                        </li>
                        <li>{props.item.message}</li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

function unix_time_converter(time){
    let date = new Date(time);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (+date.getMonth()+1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let dmy = day+'/'+month+'/'+year;
    let hms = hour+':'+minutes+':'+seconds;
    return {dmy: dmy, hms: hms};
}

export default Message;