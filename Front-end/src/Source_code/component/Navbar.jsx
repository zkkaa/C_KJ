import { UserCircle } from "@phosphor-icons/react";
import "./component-css/Navbar.css";
import CurrentDate from "./fitur_tambahan/date.jsx"
import { useState, useEffect } from "react";
import axios from 'axios'


export default function Navbar() {
  const[username, setUsername] = useState();

  useEffect(()=>{
    const getLocal = localStorage.getItem('Authorization');
    axios
    .post(`${import.meta.env.VITE_API_URL}/getUser`, { getLocal })
    .then((res) => {
      const Response = res.data
      setUsername(Response[0].username)
    });
  }, [])

  return (
    <nav className="navigasi">
      <div className="div_navigasi">
        <div className="tanggal">
          <a href="">
            <span>
              <CurrentDate />
            </span>
          </a>
        </div>
        <div className="user">
          <div>
            <i className="ph-user-circle">
              <UserCircle />
            </i>
          </div>
          <span>{username}</span>
        </div>
      </div>
    </nav>
  );
}
