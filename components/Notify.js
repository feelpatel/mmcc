import React,{useImperativeHandle, forwardRef, useRef} from 'react'
import NotificationAlert from 'react-notification-alert';

const Notify = forwardRef((props,ref)=>{   
    const notifyEl = useRef(null);
    const notifys = (place,type,title,message) => {
        let options = {
            place: place,
            message: (
                <div className="alert-text">
                <span className="alert-title" data-notify="title">
                    {" "}
                    {title}
                </span>
                <span data-notify="message">
                    {message}
                </span>
                </div>
            ),
            type: type,
            icon: "bx bx-bell-55",
            autoDismiss: 7    
        };
        notifyEl.current.notificationAlert(options);
    };
    useImperativeHandle(ref, () => ({
        notifyClick(data){
            console.log(data," datas ")
            notifys(data.place,data.type,data.title,data.message)
        }
    }));
    return (
        <>
          <NotificationAlert ref={notifyEl} />  
        </>
    )
})

export default Notify