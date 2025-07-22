import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar/Navbar";
import ContactList from "./Components/Contacts/contactList";
import EditContact from "./Components/Contacts/EditContact";
import ViewContact from "./Components/Contacts/View-contacts";
import { BrowserRouter, Route,Routes,Navigate } from "react-router-dom";
import AddContact from "./Components/Contacts/AddContact";
import { Spinner } from "./Components/spinner/spinner";

import './index.css'
import { ToastContainer } from "react-toastify";
function App()
{


    return(
        <>
        
          <BrowserRouter>
        
          <Navbar/>
             <Routes>
                <Route path='/' element={< Navigate to ={"/contacts/list"}/>}></Route>
                <Route path='/contacts/list'element={<ContactList/>}></Route>
                <Route path='/contacts/view/:_id'element={ <ViewContact/> }></Route>
                <Route path='/contacts/edit/:_id'element={ <EditContact/> }></Route>
                <Route path='/contacts/add' element={<AddContact/>}></Route>
                <Route path='*' element={<div className="text-center h-100 d-flex justify-content-center align-items-center"><h3 >Requested page not found</h3></div>}></Route>
             </Routes>
           <ToastContainer/>
          </BrowserRouter>
        </>
    )
}

export default App;