import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios"
let AddContact = () =>{
  const BASE_URL = import.meta.env.VITE_API_URL;
     let [state,setState] = useState({
       loading:false,
       contact:{
               name:"",
               mobile:"",
               image:"",
               email:"",
               company:"",
               title:"",
               group:""
               
       },group:[],errorMessage:""
     })

     function handleInputChange(e)
     {
         setState({...state,
          contact:{
            ...state.contact,
            [e.target.name]: e.target.value,
          }
     })
     }

     useEffect(()=>{
           axios.get(`${BASE_URL}/groups`)
          .then(response => setState(prevState => ({...prevState,loading:false,group:response.data})))
          .catch(error => {
            console.error("Error fetching groups:", error);
            setState(prevState => ({...prevState, loading: false, errorMessage: "Failed to load groups"}));
          })
     },[])
     
     let navigate = useNavigate()
     function addContact(e)
     {
        e.preventDefault()


        axios.post(`${BASE_URL}/contacts`,state.contact)
        .then((response)=>{
          if(response.status === 201)
          {
            toast.success("Contact added successfully")
            navigate('/')
          }
        })
        .catch((error)=>{
          toast.error("Failed to add contact",error)
        })

     }
       let {loading,contact,group,errorMessage} = state;

     
     return(
        <>
        
          <section className="add-contact">
            <div className="container p-3">
              <div className="row">
                <div className="col">
                  <p className="h3 text-success">Add Contact</p>
                <p className="fst-italic">Easily add new contacts by filling in their details. Store names, emails, phone numbers, and more to keep your contact list organized, updated, and accessible anytime you need it.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <form className='' onSubmit={addContact}> 
                    <div className="mb-2">
                      <input type="text" placeholder="Name" className="form-control " onChange={handleInputChange} value={contact.name} name='name' required />
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Email" className="form-control" onChange={handleInputChange} value={contact.email} name='email' required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Photo Url" className="form-control"   onChange={handleInputChange} value={contact.image} name='image' required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Mobile" className="form-control"  onChange={handleInputChange} value={contact.mobile} name='mobile'required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Company" className="form-control"  onChange={handleInputChange} value={contact.company} name='company'required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Title" className="form-control"   onChange={handleInputChange} value={contact.title} name='title'required/>
                    </div>
                      <div className="mb-2">
                      <select  className="form-select text-muted" onChange={handleInputChange} name='group'>
                        
                        { group.length > 0 &&
                           group.map((key)=> <option key={key.id} value={key.id}> {key.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="mb-2">
                         <button type="submit" className="btn btn-success outline-none">Save</button>
                         <Link to={'/contacts/list'}>  <button type="cancel" className="btn btn-dark mx-2">Back</button></Link>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </section>
        </>
     )
}

export default AddContact;