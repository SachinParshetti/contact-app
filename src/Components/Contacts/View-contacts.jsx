import React from "react";
import { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../services/contactService";
import { Spinner } from "../spinner/spinner";
import axios from "axios";
let ViewContact = () => {
const BASE_URL = import.meta.env.VITE_API_URL;
   let { _id } = useParams()

   let [contactInfo, setContactInfo] = useState({ loading: false, contact: {}, errorMessage: '' ,group:{}})

   useEffect(() => {
      const fetchContactById = async () => {
         try {
            setContactInfo(prevState => ({ ...prevState, loading: true }));
            const contactRes = await axios.get(`${BASE_URL}/contacts/${_id}`);
            const groupRes = await axios.get(`${BASE_URL}/groups/${contactRes.data.group}`);
            
            if (contactRes.data && groupRes.data) {
               setContactInfo({ loading: false, contact: contactRes.data, group: groupRes.data, errorMessage: '' });
            } else {
               setContactInfo(prevState => ({...prevState, loading: false, errorMessage: "Failed to load contact details"}));
            }
         } catch (error) {
            console.error("Fetching Contact details failed: " + error);
            setContactInfo(prevState => ({...prevState, loading: false, errorMessage: error.message}));
         }
      };

      fetchContactById()
   }, [_id])

   let { loading, contact, errorMessage,group } = contactInfo;

   return (
      <>
         {
            loading ? <Spinner />
               : <React.Fragment>
                  <section className="view-contact-intro">
                     <div className="container">
                        <div className="row mt-2">
                           <div className="col">
                              <h1 className="text-warning">Contacts Details</h1>
                              <p className='fst-italic'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iure, doloribus tempora ad, ipsam commodi dolorem eius eaque non aspernatur quos reprehenderit, sunt porro. Consectetur sequi molestiae cupiditate modi debitis.</p>
                           </div>
                        </div>
                     </div>
                  </section>

                  <section className="View-contact mt-3">
                     <div className="container">
                        <div className="row d-flex justify-content-center align-items-center ">
                           <div className="col-4 ">
                              <img src={contact.image} alt="person-img" className="img-fluid img-size" />
                           </div>
                           <div className="col-8">
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

                                 <li className="list-group-item list-group-item-action">
                                    Company: <span className="fw-bold">{contact.company}</span>
                                 </li>
                                 <li className="list-group-item list-group-item-action">
                                    Title: <span className="fw-bold">{contact.title}</span>
                                 </li>
                                 <li className="list-group-item list-group-item-action">
                                    Group: <span className="fw-bold">{group.name}</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div className="row mt-2">
                           <div className="col">
                              <Link to={'/contacts/list'} className="btn btn-warning"> Back</Link>
                           </div>
                        </div>
                     </div>
                  </section>
               </React.Fragment>

         }

      </>
   )
}

export default ViewContact;