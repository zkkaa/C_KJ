import "./CSS/Login.css";
import image from "../asset/remove_logo.png";
import image_chart from "../asset/chart.jpg";
import { useState } from "react";
import axios from "axios";
import { LoginBerhasil } from "./component/PopUp/login-berhasil";
import { GagalLogin } from "./component/PopUp/gagal-login";

function Container() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(""); 

  function HandleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          window.localStorage.setItem("Authorization", res.data.token)
          setLoginStatus("success");
        } else {
          setLoginStatus("failed");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    {loginStatus === "success" && <LoginBerhasil />}
    {loginStatus === "failed" && <GagalLogin />}
    <div className={`container ${loginStatus ? 'blur' : ''}`} style={loginStatus ? {overflow: 'hidden'} : {}}>
      <Background />
        <div className="login-box">
          <p>Masuk Sekarang</p>
          <form onSubmit={HandleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name=""
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name=""
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="button-login">
              <button type="submit" className={loginStatus ? 'no-hover' : ''}>Login</button>
            </div>
          </form>
        </div>
        </div>
        </>
  );
}

function Background(){
  return(
    <div className="bg-login">
        <div className="bg-login-left">
            <div className="left-top">
                <div className="lingkaran"></div>
                <div className="login-logo">
                    <img src={image} alt=""/>
                </div>
            </div>
            <div className="left-bottom">
                <div className="box-deskip">
                    <div className="span">
                        <span>Membantu kamu untuk lebih mudah mengatur keuangan!</span>
                    </div>
                    <div className="gambar">
                        <img src={image_chart} alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-login-right">
            <div className="div-miring">
                <div className="miring"></div>
            </div>
        </div>
    </div>
  )
}



export default function Log_in() {
  return <Container />;
}
