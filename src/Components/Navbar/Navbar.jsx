import { Link } from "react-router-dom";

let Navbar = () =>{
     return(
        <>
          <div className='navbar navbar-dark  bg-dark navbar-expand-sm'>
                 <div className="container">
                      <Link to={'/'} className="navbar-brand d-flex align-items-center"> <i className='fa fa-address-card text-warning  fs-3 me-2'/> Contact Manager</Link>
                 </div>
          </div>
        
        </>
     )
}

export default Navbar;