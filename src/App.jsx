import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AddNewDoctor from "../Components/AddNewDoctor";
import Doctors from "../Components/Doctors";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import Message_Check from "../Components/Message_Check";
import AddNewAdmin from "../Components/AddNewAdmin";
import Sidebar from "../Components/Sidebar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./main";
import axios from "axios";
import "./App.css";
const App = () => {
  const { IsAuth, setAuth, setuser } = useContext(AuthContext);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        // console.log(res);
        if (res.data.success) {
          setuser(res.data);
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
        setuser("");
        console.log(error);
      }
    };
    getuser();
  }, [IsAuth]);

  return (
    <>
      <BrowserRouter>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/addnewadmin"
            element={<AddNewAdmin></AddNewAdmin>}
          ></Route>
          <Route
            path="/addnewdoctor"
            element={<AddNewDoctor></AddNewDoctor>}
          ></Route>
          <Route
            path="/messages"
            element={<Message_Check></Message_Check>}
          ></Route>
          <Route path="/doctors" element={<Doctors></Doctors>}></Route>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
