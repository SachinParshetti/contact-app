import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactServices } from "../../services/contactService";
import { Spinner } from "../spinner/spinner";
import { toast } from "react-toastify"
import axios from "axios";
let EditContact = () =>{
const BASE_URL = import.meta.env.VITE_API_URL;
   //  For updating data 
      let {_id} = useParams()
     
      let navigate = useNavigate()
    
      let [state,setState] = useState({
        loading:false,contact:{
               name:"",
               mobile:"",
               image:"",
               email:"",
               company:"",
               title:"",
               group:""
        },groups:[],errorMessage:''
      })
      
    
      const updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        });
    };
      function handleUpdateClick(e)
      {
        e.preventDefault()
        // ContactServices.updateContact(state.contact,contactId)

        axios.put(`${BASE_URL}/contacts/${_id}`,state.contact)
        .then(responce => {
          if(responce)
          {
          
            toast.success("contact updated successfully");
            navigate('/')
          }
        })
        .catch((error)=>{
             
              toast.error("Failed to update contact", error)
              navigate(`contacts/edit/${_id}`)
        })
      }


      useEffect(() => {
        const fetchContact = async () => {
            try {
                setState(prevState => ({ ...prevState, loading: true }));
                const contactRes = await axios.get(`${BASE_URL}/contacts/${_id}`);
                const groupsRes = await axios.get(`${BASE_URL}/groups`);
                if (contactRes.data && groupsRes.data) {
                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                        contact: contactRes.data,
                        groups: groupsRes.data,
                    }));
                } else {
                    setState(prevState => ({ ...prevState, loading: false, errorMessage: "Failed to load data" }));
                }
            } catch (error) {
                toast.error("Failed to load contact information", error);
                setState(prevState => ({ ...prevState, loading: false, errorMessage: "Failed to load contact information" }));
            }
        };
        fetchContact();
    }, [_id]);

      let {loading,contact,groups,errorMessage} = state;
     return(
        <>
        
          {
            loading ? <Spinner/>
            :  <React.Fragment>
             <section className="add-contact">
            <div className="container p-3">
              <div className="row">
                <div className="col">
                  <p className="h3 text-primary">Update Contact</p>
                  < p className='fst-italic'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, optio numquam! Animi explicabo perferendis dicta adipisci laudantium doloremque nobis at tempore repudiandae eum nam cupiditate porro ea, consequuntur eos dolorem.</p>
                </div>
              </div>

              <div className="row d-flex justify-content-center align-items-center">

                <div className="col-lg-4 col-md-4 col-sm-12  d-flex justify-content-center align-items-center ">
                 <img src={contact.image} alt="person-img"  className="img-fluid img-size"/>
                </div>

                <div className="col-md-8 col-lg-8 colsm-12">
                  <form onSubmit={handleUpdateClick}> 
                    <div className="mb-2">
                      <input type="text" placeholder="Name" className="form-control" onChange={updateInput} value={contact.name} name="name" required />
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Email" className="form-control" onChange={updateInput} value={contact.email} name="email" required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Photo Url" className="form-control" onChange={updateInput} value={contact.image} name="image" required />
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Mobile" className="form-control" onChange={updateInput} value={contact.mobile} name="mobile" required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Company" className="form-control" onChange={updateInput} value={contact.company} name="company" required/>
                    </div>
                      <div className="mb-2">
                      <input type="text" placeholder="Title" className="form-control" onChange={updateInput} value={contact.title} name="title" required/>
                    </div>
                      <div className="mb-2">
                      <select  className="form-select text-muted" name='group' onChange={updateInput} value={contact.group} required>
                        {
                          groups.map((group)=> <option key={group.id} value={group.id}>{group.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="mb-2">
                         <button className="btn btn-primary" >Update</button>
                         <Link to={'/contacts/list'}>  <button type="cancel" className="btn btn-dark mx-2 ">Back</button></Link>
                    </div>
                  </form>
                </div>
                

              </div>
            </div>
          </section>
           </React.Fragment>
          }
          
        </>
     )
}

export default EditContact;