import React,{ forwardRef, useImperativeHandle, useState,useRef} from 'react'
import {Button,Modal} from 'react-bootstrap'
import { default as NextLink } from 'next/link';
import { useForm } from "react-hook-form";
import { URL } from '../utils/prismicHelpers'
import Notify from './Notify'

const LoginModal = forwardRef((props,ref)=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showFormUi, setShowFormUi] = useState(false)
   

    useImperativeHandle(ref, () => ({
        openModal(){
            setShow(true)
        }
    }));   
     
    return (
        <>
            <Modal className="modal-1" show={show} onHide={handleClose} className="modal-view1 modal-primary text-center">
                <button onClick={()=>handleClose()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                <Modal.Body>
                    {
                        showFormUi ? 
                        <ForgotUi onChildClick={()=> setShowFormUi(false) } ></ForgotUi> : 
                        <LoginUi onChildClick={()=> setShowFormUi(true) } onClose={()=>handleClose()} ></LoginUi>
                    }                                                        
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <p>New on Master Casting and Cad? <NextLink href="/register"><a className="form-text text-white" ><span>Create an account</span></a></NextLink></p>
                </Modal.Footer>
            </Modal>
        </>
    )
})

const LoginUi = ({data,onChildClick,onClose}) => {
    const { register, handleSubmit, errors } = useForm();
    const [errorRef, setShowError] = useState('');
    const alertRef = useRef();
    console.log(data," handleClose ",onClose)
    const onLoginSubmit = event => {
        console.log(event);
        setShowError("") 
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(event)
        };
        /* const res = await fetch(URL+'/api/login', requestOptions)
        const result = await res.json() */
        fetch(URL+'/api/login', requestOptions)
        .then(response => { 
            if (!response.ok) {  
                if(response.status == 401){
                   setShowError("UserName and password wrong") 
                   alertRef.current.notifyClick({title:"Error ",message:"UserName and password wrong", place:"tr",type:"danger"});   
                }              
                throw new Error(response.status);
            }           
            return response.json(); 
        })
        .then(result => {
            localStorage.setItem("user", JSON.stringify(result));
            localStorage.setItem("token", result.token);
            alertRef.current.notifyClick({title:"Success ",message:"", place:"tr",type:"success"});                         
            onClose()
        })
        .catch(error => {                     
            console.log('error', error)
        });
        //console.log(result," rea ");
    };
    return (
        <>
            <Notify ref={alertRef} />
            <form onSubmit={handleSubmit(onLoginSubmit)}>                                                         
                <div className="head text-center mb-5">
                    <span>Welcome Back</span>
                    <div className="title h1">Login</div>                   
                    <div className="diamond-strip"><span /></div>
                     <span className="text-white">{errorRef}</span>
                </div>
                <div className="form-floating mb-3">
                    <input name="username" type="text" className="form-control" ref={register({ required: true })} placeholder="Username or Email Address" />
                    <input name="fcm_token" type="hidden" value="web" ref={register()} className="form-control" />
                    <label htmlFor="floatingInput">Username or Email Address</label>
                    <span className="text-white">{errors.username && "Username is required"}</span>
                </div>
                <div className="form-floating mb-3">
                    <input name="password" type="password" className="form-control"  ref={register({ required: true })} placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                    <span className="text-white">{errors.password && "Password is required"}</span>                    
                    <div className="text-end mt-2">
                        <a href="#" onClick={onChildClick} className="form-text text-white">Forgot your password?</a>
                    </div>
                </div>
                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-block btn-light mb-2">Login</button>
                    <div className="mb-3 small">By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</div>
                </div>
            </form>
        </>
    )
}

const ForgotUi =({data,onChildClick}) =>{
    console.log( data," ForgotUi ",onChildClick);
    const { register, handleSubmit, errors } = useForm();
    const onForgotSubmit = data =>{
        console.log(data)
    };
    return (
        <>
            <form onSubmit={handleSubmit(onForgotSubmit)}>                                                         
                <div className="head text-center mb-5">
                    <span>Welcome Back</span>
                    <div className="title h1">Forgot Password</div>
                    <div className="diamond-strip"><span /></div>
                </div>
                <div className="form-floating mb-3">
                    <input name="email" type="text" className="form-control" ref={register({
                            required: {
                                value:"Required",
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} placeholder="Email Address" />
                    <label htmlFor="floatingInput">Email Address</label>
                    <span className="text-white">{errors.email && errors.email.message}</span>                    
                </div>
                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-block btn-light mb-2">Submit</button>
                    <div className="mb-3 small"><a onClick={onChildClick} href="#">Go Back To Login</a></div>
                </div>
            </form>
        </>
    )
}

export default LoginModal