import {useState,useEffect, useRef} from 'react';
import { RichText } from 'prismic-reactjs';
import { Tab, Nav } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {SendRequest,SendFormRequest} from '../../utils/prismicHelpers'
import ContactUs from '../../components/ContactUs'
import Notify from '../Notify'

const iState = {
    country_id: 0,
    state_id: 0,
    city_id:0
}


const RegisterModal = ({ slice }) =>{
    const [jbtMember, handleJbtChange] = useState(true)
    const [hearAbout, handleAboutChange] = useState(false)
    const [country, setCountry] = useState([])
    const [states, setStates] = useState([])
    const [city, setCity] = useState([])
    const contactRef = useRef();
    const notifyEl = useRef(null);
    const alertRef = useRef();

    const {
        register: companyRegister,
        errors: errorsCompany,
        handleSubmit: handleCompanySubmit,
        unregister:companyUnregister,
        reset:resetC
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });
    useEffect(() => {
        getCountryList();
        
    }, [])
 
    const {
        register: individualRegister,
        errors: errorsIndividual,
        handleSubmit: handleIndividualSubmit,
        unregister:individualUnregister,
        reset:resetI
    } = useForm({
        mode: "onBlur"
    });
    const onHearAboutUs = (event) =>{       
        if(event.target.value == 'Shows'){
            handleAboutChange(true)
        }else{
            console.log('onHearAboutUs',event.target.value)
            handleAboutChange(false)
        }
    }
    const onCompanySubmit = async (event,e)=>{  
        var data = new FormData();               
        Object.keys(event).map(function(key) {
            if(key == "file"){
                data.append(key,  event[key][0]);
            }else{
                data.append(key, event[key]);
            }            
        });
        const Response = await SendFormRequest('/api/register_company',data,'POST')        
        const Res = Response.json().then(res=>{            
            console.log(res," dre ")
            if(Response.status == 200){
                alertRef.current.notifyClick({title:"Success ",message:"", place:"tr",type:"success"}); 
                e.target.reset();
            }else{
                alertRef.current.notifyClick({title:"Error ",message:res.errors, place:"tr",type:"danger"}); 
            }   
        })             
    }
    
    const getCountryList = async ()=>{
        const Response = await SendRequest('/api/getCountryList','','GET')
        Response.json().then(res=>{            
            setCountry(res);
        })        
    }
    const getStateList = async (country_id)=>{
        const Response = await SendRequest('/api/getStateList/'+country_id,'','GET')
        Response.json().then(res=>{ 
            setStates(res); 
            iState.country_id = country_id;   
        })
    }   
    const getCityList = async(state_id)=>{
        const Response = await SendRequest('/api/getCityList/'+iState.country_id+'/'+state_id,'','GET')
        Response.json().then(res=>{ 
            setCity(res);
            iState.state_id = state_id;  
        })
    }
    const onIndividualSubmit = async(event,e) => {
        var data = new FormData();               
        Object.keys(event).map(function(key) {
            if(key == "files"){
                var files = event[key];                
                Object.keys(files).map(function(idx) {                    
                    data.append("files[]", files[idx]);
                })                                
            } else if (key == "user_proof"){
                const user_proof = event[key];  
                data.append("user_proof[]", user_proof);
            } else{
                data.append(key, event[key]);
            }                      
        });
        const Response = await SendFormRequest('/api/register',data,'POST')
        const Res = Response.json().then(res=>{            
            console.log(res," dre ")
            if(Response.status == 200){
                alertRef.current.notifyClick({title:"Success ",message:"", place:"tr",type:"success"}); 
                e.target.reset();
            }else{
                alertRef.current.notifyClick({title:"Error ",message:res.errors, place:"tr",type:"danger"}); 
            }   
        })
    };
    return(
        <>
        
        <Notify ref={alertRef}  />
        <section className="sec-gap sec-register">           
            <div className="container">
                <div className="box bg-white">
                    <div className="row g-0">
                        <div className="col-md-4 d-bg caption bg-dark">
                            <img src={slice.primary.background.url} className="d-bg-img" alt="background" />
                            <div className="box sec-half-caption">
                                <div className="head text-center">
                                    
                                   
                                    <RichText render={slice.primary.title1} />                                                                      
                                    <div className="diamond-strip"><span /></div>
                                    <RichText render={slice.primary.desc} />                                   
                                    <ContactUs ref={contactRef} ></ContactUs> 
                                    <a onClick={() => contactRef.current.openContactUsModal()}  
                                    href="#" className="btn btn-min btn-1 white mt-2">Contact Us</a>
                                    

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-1">
                                <Tab.Container id="tabs" defaultActiveKey="nav-company-tab">
                                    <div className="nav nav-tabs justify-content-center" id="nav-tab">
                                        <Nav variant="pills" className="tab-1">
                                            <Nav.Item key="mi">
                                                <Nav.Link type="button" className="nav-link has-icon" eventKey="nav-company-tab">
                                                    <i className="bx bx-buildings" /> Company
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item key="ni">
                                                <Nav.Link type="button"  className="nav-link has-icon" eventKey="nav-individual-tab">
                                                    <i className="bx bx-user" /> Individual
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>   
                                    </div>                                                                                
                                    <Tab.Content>
                                        <Tab.Pane key={'first'} eventKey="nav-company-tab">
                                            <form onSubmit={handleCompanySubmit(onCompanySubmit)}>
                                                <div  id="nav-company" role="tabpanel" aria-labelledby="nav-company-tab">
                                                    <div className="mx6 m-auto">
                                                        <div className="row g-2">
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="first_name" className="form-control" placeholder="First Name" ref={companyRegister({ required:{ value:"Required", message: "Firstname is required" } })} />
                                                                    <label>First Name *</label>
                                                                    <span className="text-danger">{errorsCompany.first_name && errorsCompany.first_name.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="last_name" className="form-control" placeholder="Last Name" ref={companyRegister({ required:{ value:"Required", message: "Lastname is required" } })} />
                                                                    <label>Last Name *</label>
                                                                    <span className="text-danger">{errorsCompany.last_name && errorsCompany.last_name.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-floating">
                                                                    <input type="text" name="company_name" className="form-control" placeholder="Company Name *" ref={companyRegister({ required:{ value:"Required", message: "Company name is required" } })} />
                                                                    <label>Company Name *</label>
                                                                    <span className="text-danger">{errorsCompany.company_name && errorsCompany.company_name.message}</span>
                                                                </div>
                                                            </div>
                                                             <div className="col-md-12">
                                                                <div className="form-floating">
                                                                    <input type="text" name="website" className="form-control" placeholder="website Name *" ref={companyRegister({ required:{ value:"Required", message: "Website name is required" } })} />
                                                                    <label>Website Name *</label>
                                                                    <span className="text-danger">{errorsCompany.website && errorsCompany.website.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-floating">
                                                                    <textarea name="address1" className="form-control" placeholder="Address" rows={4} defaultValue={""} ref={companyRegister({ required:{ value:"Required", message: "Address is required" } })} />
                                                                    <label>Address *</label>
                                                                    <span className="text-danger">{errorsCompany.address1 && errorsCompany.address1.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">      
                                                                    {console.log(country," co ")}                                                              
                                                                    <select onChange={(e)=> getStateList(e.target.value)} name="country" defaultValue="" className="form-select" ref={companyRegister({ required:{ value:"Required", message: "Country is required" } })} >
                                                                        <option key="country-0" value="">Select a country</option>
                                                                        {                                                                          
                                                                            country.map((value,index)=>{                                                                               
                                                                               return (
                                                                                   <>
                                                                                    <option key={`country-${index}`} value={value.id}>{value.name}</option>
                                                                                   </>
                                                                               )
                                                                            })                                                                            
                                                                        }                                                                                                                                   
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">Country *</label>
                                                                    <span className="text-danger">{errorsCompany.country && errorsCompany.country.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select onChange={(e)=> getCityList(e.target.value)} name="state" defaultValue="" className="form-select" ref={companyRegister({ required:{ value:"Required", message: "State is required" } })}>
                                                                        <option key="state-0" value="">Select a state</option>
                                                                        {                                                                          
                                                                            states.map((value,index)=>{                                                                               
                                                                               return <option key={`state-${index}`} value={value.id}>{value.name}</option>
                                                                            })                                                                            
                                                                        } 
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">State *</label>
                                                                    <span className="text-danger">{errorsCompany.state && errorsCompany.state.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select name="city" defaultValue="" className="form-select" ref={companyRegister({ required:{ value:"Required", message: "City is required" } })}>
                                                                        <option  key="city-0" value="">Select a city</option>
                                                                        {                                                                          
                                                                            city.map((value,index)=>{                                                                               
                                                                               return <option key={`city-${index}`} value={value.id}>{value.name}</option>
                                                                            })                                                                            
                                                                        } 
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">City *</label>
                                                                    <span className="text-danger">{errorsCompany.city && errorsCompany.city.message}</span>
                                                                </div>
                                                            </div>                                                            
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="zip" className="form-control" placeholder="zip" ref={companyRegister({ required:{ value:"Required", message: "Zip is required" } })} />
                                                                    <label>Zip *</label>
                                                                    <span className="text-danger">{errorsCompany.zip && errorsCompany.zip.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="number" name="phone" className="form-control" placeholder="Phone Number" ref={companyRegister({ required:{ value:"Required", message: "Phone is required" } })} />
                                                                    <label>Phone Number</label>
                                                                    <span className="text-danger">{errorsCompany.phone && errorsCompany.phone.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="email" name="email" className="form-control" placeholder="Email" ref={companyRegister({ required:{ value:"Required", message: "Email is required" },pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} />
                                                                    <label>Email *</label>
                                                                    <span className="text-danger">{errorsCompany.email && errorsCompany.email.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="username" className="form-control" placeholder="Username" ref={companyRegister({ required:{ value:"Required", message: "Username is required" } })} />
                                                                    <label>Username *</label>
                                                                    <span className="text-danger">{errorsCompany.username && errorsCompany.username.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="password" name="password" className="form-control" placeholder="Password" ref={companyRegister({ required:{ value:"Required", message: "Password is required" } })} />
                                                                    <label>Password *</label>
                                                                    <span className="text-danger">{errorsCompany.password && errorsCompany.password.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 py-2"  >
                                                                <label className="form-check-inline">Are you a jbt member?</label>
                                                                <div className="form-check form-check-inline" onChange={ ()=>{
                                                                        console.log("handleJbtChange(true)")                                                                        
                                                                        handleJbtChange(true)
                                                                    } }>
                                                                    <input ref={companyRegister()} defaultChecked className="form-check-input" defaultValue="yes" type="radio" name="optradio" id="jbt-yes" />
                                                                    <label className="form-check-label" htmlFor="jbt-yes">Yes</label>
                                                                </div>
                                                                <div className="form-check form-check-inline" onChange={ ()=>{
                                                                        console.log("handleJbtChange(false)")                                                                        
                                                                        handleJbtChange(false)
                                                                    } }>
                                                                    <input ref={companyRegister()}  className="form-check-input" type="radio" value="no" name="optradio" id="jbt-no" />
                                                                    <label className="form-check-label" htmlFor="jbt-no">No</label>
                                                                </div>
                                                            </div>
                                                            {jbtMember ? 
                                                                (
                                                                    <>  
                                                                        <div className="col-md-6" > 
                                                                            <div className="form-floating">
                                                                                <input type="text" name="jbt" className="form-control" placeholder="Enter Jbt#" ref={companyRegister({ required:{ value:"Required", message: "Jbt is required" } })} />
                                                                                <label>Enter Jbt#</label>
                                                                                <span className="text-danger">{errorsCompany.jbt && errorsCompany.jbt.message}</span>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) :
                                                                <>  
                                                                    <div className="col-md-6">
                                                                        <div className="form-floating">
                                                                            <input type="text" name="fed_tax" className="form-control" placeholder="Fed tax"  ref={companyRegister({ required:{ value:"Required", message: "fed_tax is required" } })} />
                                                                            <label>Fed tax id *</label>
                                                                            <span className="text-danger">{errorsCompany.fed_tax && errorsCompany.fed_tax.message}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-floating">
                                                                            <input type="text" name="resale_tax" className="form-control" placeholder="resale tax" ref={companyRegister({ required:{ value:"Required", message: "Resale tax is required" } })} />
                                                                            <label>Resale tax id*</label>
                                                                            <span className="text-danger">{errorsCompany.resale_tax && errorsCompany.resale_tax.message}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12" >
                                                                        <div className="mb-3">
                                                                            <input className="form-control" name="file" type="file" id="formFile"  ref={companyRegister({ required:{ value:"Required", message: "Image is required" } })} />
                                                                            <span className="text-danger">{errorsCompany.file && errorsCompany.file.message}</span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }                                                        
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select onChange={e => onHearAboutUs(e)} name="hear_about_us" defaultValue="" className="form-select" ref={companyRegister({ required:{ value:"Required", message: "Please select option" } })} >
                                                                        <option value="">Select option</option>                                                                
                                                                        <option value="Google">Google</option>
                                                                        <option value="Social Media">Social Media</option>
                                                                        <option value="Word of Mouth">Word of Mouth</option>
                                                                        <option value="Shows">Shows</option>
                                                                    </select>
                                                                    <label>How did you hear about us?</label>
                                                                    <span className="text-danger">{errorsCompany.hear_about_us && errorsCompany.hear_about_us.message}</span>
                                                                </div>
                                                            </div>
                                                            {hearAbout && 
                                                                (
                                                                    <div className={`col-md-6 ${hearAbout}`} >
                                                                        <div className="form-floating">
                                                                            <input name="hear_about_us_show" type="text" className="form-control" placeholder="Hear about us show" ref={companyRegister({ required:{ value:"Required", message: "Hear about us show is required" } })} />
                                                                            <label>Which Show*</label>
                                                                            <span className="text-danger">{errorsCompany.hear_about_us_show && errorsCompany.hear_about_us_show.message}</span> 
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            <div className="col text-end">
                                                                <button className="btn btn-primary btn-lg btn-min">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab.Pane>
                                        <Tab.Pane key={'second'} eventKey="nav-individual-tab">
                                            <form onSubmit={handleIndividualSubmit(onIndividualSubmit)}>               
                                                <div className=" " id="nav-individual" role="tabpanel" aria-labelledby="nav-individual-tab">
                                                    <div className="mx6 m-auto">
                                                        <div className="row g-2">
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="first_name" className="form-control" placeholder="First Name" ref={individualRegister({ required:{ value:"Required", message: "Firstname is required" } })} />
                                                                    <label>First Name *</label>
                                                                    <span className="text-danger">{errorsIndividual.first_name && errorsIndividual.first_name.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input type="text" name="last_name" className="form-control" placeholder="Last Name" ref={individualRegister({ required:{ value:"Required", message: "Lastname is required" } })} />
                                                                    <label>Last Name *</label>
                                                                    <span className="text-danger">{errorsIndividual.last_name && errorsIndividual.last_name.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-floating">
                                                                    <textarea name="address1" className="form-control" placeholder="Address" rows={4} defaultValue={""} ref={individualRegister({ required:{ value:"Required", message: "Address is required" } })} />
                                                                    <label>Address *</label>
                                                                    <span className="text-danger">{errorsIndividual.address1 && errorsIndividual.address1.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select onChange={(e)=> getStateList(e.target.value)} name="country" defaultValue="" className="form-select" ref={individualRegister({ required:{ value:"Required", message: "Country is required" } })} >
                                                                        <option  key="country-i-0" value="">Select a country</option>                                                                      
                                                                        {                                                                          
                                                                            country.map((value,index)=>{                                                                               
                                                                               return (
                                                                                   <>
                                                                                    <option key={`i-country-${index}`} value={value.id}>{value.name}</option>
                                                                                   </>
                                                                               )
                                                                            })                                                                            
                                                                        }
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">Country *</label>
                                                                    <span className="text-danger">{errorsIndividual.country && errorsIndividual.country.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select onChange={(e)=> getCityList(e.target.value)} name="state" defaultValue="" className="form-select" ref={individualRegister({ required:{ value:"Required", message: "State is required" } })} >
                                                                        <option  key="state-i-0" value="">Select a state</option>
                                                                        {                                                                          
                                                                            states.map((value,index)=>{                                                                               
                                                                               return <option key={`i-state-${index}`} value={value.id}>{value.name}</option>
                                                                            })                                                                            
                                                                        } 
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">State *</label>
                                                                    <span className="text-danger">{errorsIndividual.state && errorsIndividual.state.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <select name="city" defaultValue="" className="form-select" ref={individualRegister({ required:{ value:"Required", message: "City is required" } })} >
                                                                        <option  key="city-i-0" value="">Select a city</option>
                                                                        {                                                                          
                                                                            city.map((value,index)=>{                                                                               
                                                                               return <option key={`i-city-${index}`} value={value.id}>{value.name}</option>
                                                                            })                                                                            
                                                                        }
                                                                    </select>
                                                                    <label htmlFor="floatingSelectGrid">City *</label>
                                                                    <span className="text-danger">{errorsIndividual.city && errorsIndividual.city.message}</span>
                                                                </div>
                                                            </div>                                                            
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input name="zip" type="number" className="form-control" placeholder="zip" ref={individualRegister({ required:{ value:"Required", message: "Zip is required" } })} />
                                                                    <label>Zip *</label>
                                                                    <span className="text-danger">{errorsIndividual.zip && errorsIndividual.zip.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input name="phone" type="text" className="form-control" placeholder="Phone Number" ref={individualRegister({ required:{ value:"Required", message: "Phone is required" } })} />
                                                                    <label>Phone Number</label>
                                                                    <span className="text-danger">{errorsIndividual.phone && errorsIndividual.phone.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input name="email" type="text" className="form-control" placeholder="Email" ref={individualRegister({ required:{ value:"Required", message: "Email is required" },pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })}  />
                                                                    <label>Email *</label>
                                                                    <span className="text-danger">{errorsIndividual.email && errorsIndividual.email.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input name="username" type="text" className="form-control" placeholder="Username" ref={individualRegister({ required:{ value:"Required", message: "Username is required" } })} />
                                                                    <label>Username *</label>
                                                                    <span className="text-danger">{errorsIndividual.username && errorsIndividual.username.message}</span> 
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <input name="password" type="password" className="form-control" placeholder="Password" ref={individualRegister({ required:{ value:"Required", message: "Password is required" } })} />
                                                                    <label>Password *</label>
                                                                    <span className="text-danger">{errorsIndividual.password && errorsIndividual.password.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 py-2" >
                                                                <p>If you are not in jewelry trade, we are not for you. We can refer you to our retail division by clicking <a href="#">link</a>.</p>
                                                                <p>If you are an individual jeweler and don’t have a company, you will need to prove that you are connected to the industry. Valid Proof</p>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Gia student id" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-1" />
                                                                    <label className="form-check-label" htmlFor="individual-1">Gia student id</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Jewelery School id" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-2" />
                                                                    <label className="form-check-label" htmlFor="individual-2">Jewelery School id</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Trade show badge" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-3" />
                                                                    <label className="form-check-label" htmlFor="individual-3">Trade show badge</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Social medial or website proving that you sell jewelery" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-4" />
                                                                    <label className="form-check-label" htmlFor="individual-4">Social medial or website proving that you sell jewelery</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Design studio" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-5" />
                                                                    <label className="form-check-label" htmlFor="individual-5">Design studio</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input ref={individualRegister({ required:{ value:"Required", message: "Select at lease one option" } })} value="Independent designer" className="form-check-input" type="checkbox" name="user_proof[]" id="individual-6" />
                                                                    <label className="form-check-label" htmlFor="individual-6">Independent designer</label>
                                                                </div>
                                                                <span className="text-danger">{errorsIndividual.user_proof && errorsIndividual.user_proof.message}</span>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <input name="files" className="form-control" multiple type="file" id="formFile" ref={individualRegister({ required:{ value:"Required", message: "File is required" } })} />
                                                                    <span className="text-danger">{errorsIndividual.files && errorsIndividual.files.message}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col text-end">
                                                                <button className="btn btn-primary btn-lg btn-min">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>            
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default RegisterModal