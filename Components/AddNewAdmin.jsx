import React, { useContext, useState } from "react";
import { AuthContext } from "../src/main";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { IsAuth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setdob] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      gender === "" ||
      nid === "" ||
      password === "" ||
      dob === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/admin/regester",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          gender: gender,
          nid: nid,
          password: password,
          dob: dob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("New Admin Added Successfully");
        // navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
      // console.log(error);
    }
  };
  if (!IsAuth) {
    navigate("/login");
  }
  return (
    <>
      <section className="page">
        <div className="container add-admin-form form-component">
          <img src="public\logo.png" alt="" />
          <h1>Add New Admin</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="NID"
                id="nid"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                id="dob"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit" className="btn btn-primary">
                Add New Admin
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewAdmin;
