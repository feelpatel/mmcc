import React,{useState,useImperativeHandle, forwardRef, useRef  } from 'react'
import {Button,Modal} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { default as NextLink } from 'next/link';
import {SendRequest} from '../utils/prismicHelpers'
import Notify from './Notify'

const ContactUs = forwardRef((props,ref)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const alertRef = useRef();

    const { register, handleSubmit,reset, errors } = useForm({ 
        mode: "onBlur",
        reValidateMode: "onBlur"});
    useImperativeHandle(ref, () => ({
        openContactUsModal(){
            setShow(true)
        }
    }));
    const onContactSubmit = async(event,e) => {
        const Response = await SendRequest('/api/frontContactUs',JSON.stringify(event),'POST')
        const Res = Response.json().then(res=>{            

            if(Response.status == 200){
                alertRef.current.notifyClick({title:"Success ",message:"", place:"tr",type:"success"}); 
                e.target.reset();
                handleClose()
            }else{
                alertRef.current.notifyClick({title:"Error ",message:res.errors, place:"tr",type:"danger"}); 
            }   
        })   
    };
    
    return (
        <>
            <Notify ref={alertRef} />
            <Modal show={show} onHide={handleClose} className="modal-view1 modal-primary text-center">
                <button onClick={()=>handleClose()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                <Modal.Body>
                    <form onSubmit={handleSubmit(onContactSubmit)}>  
                        <div className="head text-center mb-5">
                            <span>MASTER CASTING & CAD</span>
                            <div className="title h1">CONTACT</div>
                            <div className="diamond-strip"><span /></div>
                        </div>                                
                        <div className="form-floating mb-3">
                            <input type="text" name="email" className="form-control" placeholder="Email Address" ref={register({ required: { value:"Required", message: "Email is required" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} />
                            <label htmlFor="floatingInput">Email Address*</label>
                            <span>{errors.email && errors.email.message}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Full Name" ref={register({ required: { value:"Required", message: "Fullname is required" } })}  />
                            <label htmlFor="floatingInput">Full Name*</label>
                            <span>{errors.name && errors.name.message}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="mobile" className="form-control" placeholder="Phone Number" ref={register({ required: { value:"Required", message: "Phone is required" } })} />
                            <label htmlFor="floatingInput">Phone Number*</label>
                            <span>{errors.mobile && errors.mobile.message}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="store" className="form-control" placeholder="Store Name (if applicable)" ref={register({ required: { value:"Required", message: "Storename is required" } })} />
                            <label htmlFor="floatingInput">Store Name (if applicable)*</label>
                            <span>{errors.store && errors.store.message}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea name="message" className="form-control" placeholder="How Can We Help You?" rows={4} defaultValue={""} ref={register({ required:{ value:"Required", message: "message is required" } })} />
                            <label>How Can We Help You? *</label>
                            <span>{errors.message && errors.message.message}</span> 
                        </div>
                        <div className="d-grid mb-3">
                            <button className="btn btn-block btn-light mb-2">Send</button>
                            <div className="mb-3 small">By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <p>New on Master Casting and Cad?
                        <NextLink href="/register"><a className="form-text text-white" ><span>Create an account</span></a></NextLink>
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    )
})

export default ContactUs