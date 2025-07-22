import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewContact from "./View-contacts";
import { useEffect, useState } from "react";
import { Spinner } from "../spinner/spinner";
import { toast } from "react-toastify";
import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
let ContactList = () => {
   const BASE_URL = import.meta.env.VITE_API_URL;
   let [state, setState] = useState({ loading: false, contacts: [], filterdContacts: [], errorMessage: '', text: '' })

   useEffect(() => {


        axios.get(`${BASE_URL}/contacts`)
         .then((response) => {
            setState(prevState => ({
               ...prevState,
               loading: false,
               contacts: response.data,
               filterdContacts: response.data,
               text: ''
            }));
         })
         .catch((error) => {
            setState(prevState => ({ ...prevState, loading: false, errorMessage: error.message }))
            toast.error("Failed to fetch contacts", error)
         })
   }, [])

   let { loading, contacts, errorMessage, filterdContacts, text } = state;
   let navigate = useNavigate()

   //  for deleting contact
   function handleDeleteClick(contactid) {

      Swal.fire({
         title: 'Are you sure?',
         text: 'Do you really want to delete this contact?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
         if (result.isConfirmed) {
            axios.delete(`${BASE_URL}/contacts/${contactid}`)
               .then((response) => {
                  if (response) {
                     Swal.fire('Deleted!', 'Contact deleted successfully.', 'success');
                     navigate('/');
                  }
               })
               .catch((error) => {
                  Swal.fire('Error', 'Failed to delete contact.', 'error');
                  console.error(error);
               });
         }
      });
   }
   //serch contacts

   function handleSearchChange(e) {
      const searchText = e.target.value;
      const filtered = state.contacts.filter(contact =>
         contact.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setState(prevState => ({
         ...prevState,
         text: searchText,
         filterdContacts: filtered
      }));

   }

   return (
      <>
         {

            loading ?
               <Spinner />
               :
               <React.Fragment>

                  <section>
                     <div className="container p-3">
                        <div className="row">
                           <div className="col">
                              <p className="h3"> Contact Manager   <Link to={'/contacts/add'}> <button className='btn btn-primary ms-2'> <i className="fa fa-plus-circle fa-fade" /> Add</button></Link></p>
                              <i><p className="fst-italic">
                                 Manage all your contacts efficiently with our Contact Manager app. Add, edit, or remove contacts with ease.
                                 Perfect for organizing personal or business connections, it helps you stay updated and ensures all your important information is always accessible.
                              </p>
                              </i>
                           </div>
                        </div>
                     </div>

                     <div className="container my-4 ">

                        <div className="row">
                           <div className="col-md-6">
                              <form className="row">
                                 <div className="col">
                                    <div className="mb-2">
                                       <input type="text" className="form-control " placeholder="Search Names" onChange={handleSearchChange} value={text} />
                                    </div>
                                 </div>
                                 <div className="col">
                                    <button type="button" className="btn btn-outline-dark">Search</button>
                                 </div>
                              </form>
                           </div>
                        </div>

                     </div>
                  </section>

                  <section className="contact-list">
                     <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                           {
                              filterdContacts.length <= 0 ? (<div className="d-flex justify-content-center align-items-center">
                                 <span>
                                    <hr />
                                 </span>
                                 <h4>No contact found</h4>
                                 <span>   <hr className="border border-2" /></span>
                              </div>)
                                 :

                                 (

                                    contacts.length > 0 &&
                                    filterdContacts.map((contact, index) => {
                                       return (
                                          <div className=" col-sm-12 col-md-12 my-2 col-lg-6" key={contact._id}>
                                             <div className="card">
                                                <div className="card-body ">
                                                   <div className="row align-items-center">
                                                      <div className="col-md-4 d-flex justify-content-center align-items-center py-2">
                                                         <img src={contact.image} alt="person-img" className="img-fluid img-size" onError={(e) => { e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3u1C6h1_Rfxr2gHhTQT3KqG5Dof7A_g&s' }} />
                                                      </div>
                                                      <div className="col-md-7">
                                                         <ul className="list-group">
                                                            <li className="list-group-item list-group-item-action">
                                                               Name: <span className="fw-bold">{contact.name}</span>
                                                            </li>

                                                            <li className="list-group-item list-group-item-action">
                                                               Mobile: <span className="fw-bold">{contact.mobile}</span>
                                                            </li>

                                                            <li className="list-group-item list-group-item-action">
                                                               Email: <span className="fw-bold">{contact.email}</span>
                                                            </li>

                                                         </ul>
                                                      </div>
                                                      <div className="col-md-1 d-flex justify-content-center align-content-center ">
                                                         <div>
                                                            <Link to={`/contacts/view/${contact._id}`} className="btn btn-warning mx-1"> <i className="fa fa-eye fa-bounce" /></Link>
                                                            <Link to={`/contacts/edit/${contact._id}`} className="btn btn-primary my-3 mx-1"> <i className="fa fa-pen-alt fa-shake" /></Link>
                                                            <button className="btn btn-danger mx-1" onClick={() => handleDeleteClick(contact._id)}> <i className="fa fa-trash fa-beat" /></button>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )

                                    })

                                 )}


                        </div>
                     </div>


                  </section>
               </React.Fragment>
         }

      </>
   )
}

export default ContactList;