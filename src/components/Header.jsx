import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Header = ({searchText, setSearchText}) => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userdetails = localStorage.getItem("user");
    setUser(userdetails);
  }, [user]);
  
  const handlelogout = async () => {
    await localStorage.clear();
    navigation("/login");
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TODO APP</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>             
              {
                user ? 
              <li className="nav-item">
                <Link className="nav-link" onClick={handlelogout}
                  style={{cursor : 'pointer'}}
                >Logout</Link>
              </li>
              :
              <>
               <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Register</Link>
               </li>             
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              </>
              }
            </ul>
            {
              user &&
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header