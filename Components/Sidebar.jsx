import React, { useContext, useState } from "react";
import { AuthContext } from "../src/main";
import { TiHome } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLoginBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setshow] = useState(false);
  const { IsAuth, setAuth } = useContext(AuthContext);
  // console.log(IsAuth);

  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
    setshow(!show);
  };
  const gotoDoctors = () => {
    navigate("/doctors");
    setshow(!show);
  };
  const gotoMessage = () => {
    navigate("/messages");
    setshow(!show);
  };
  const gotoaddnewdoctor = () => {
    navigate("/addnewdoctor");
    setshow(!show);
  };
  const gotoaddnewadmin = () => {
    navigate("/addnewadmin");
    setshow(!show);
  };

  const handle_Logout = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/v1/user/admin/logout", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          localStorage.removeItem("adminToken");
          toast.success(res.data.message);
          setAuth(false);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <nav
        style={!IsAuth ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHome}></TiHome>
          <FaUserDoctor onClick={gotoDoctors}></FaUserDoctor>
          <MdAddModerator onClick={gotoaddnewdoctor}></MdAddModerator>
          <IoPersonAddSharp onClick={gotoaddnewadmin}></IoPersonAddSharp>
          <AiFillMessage onClick={gotoMessage}></AiFillMessage>
          <RiLoginBoxFill onClick={handle_Logout}></RiLoginBoxFill>
        </div>
      </nav>
      <div
        className="wrapper"
        style={!IsAuth ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setshow(!show)}
        ></GiHamburgerMenu>
      </div>
    </>
  );
};

export default Sidebar;
