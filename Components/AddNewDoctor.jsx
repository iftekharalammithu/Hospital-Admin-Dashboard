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
  const [doctor_deperment, setdoctor_deperment] = useState("");
  const [avatar, setavatar] = useState("");
  const [avatarprevew, setavatarprevew] = useState("");

  const navigate = useNavigate();

  const handleavatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setavatarprevew(reader.result);
      setavatar(file);
    };
  };

  const deperment_name = [
    "Surgery",
    "Pediatrics",
    "Anesthesiology",
    "Cardiology",
    "Oncology",
    "Radiology",
    "neauro sergent",
  ];

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
      dob === "" ||
      doctor_deperment === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // make a formdata
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("nid", nid);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("doctor_deperment", doctor_deperment);
      formData.append("doctor_pic", avatar);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/adddoctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      console.log(error);
    }
  };
  if (!IsAuth) {
    navigate("/login");
  }
  return (
    <>
      <section className="page">
        <div className="container add-doctor-form form-component">
          <img src="public\logo.png" alt="" />
          <h1>Add New Doctor</h1>
          <form onSubmit={handleSubmit}>
            <div className="first-wrapper">
              <div>
                <img
                  src={
                    avatarprevew ? `${avatarprevew}` : "public/docHolder.jpg"
                  }
                  alt="doctor"
                />
              </div>
              <div>
                <input type="file" onChange={handleavatar} />
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
                <select
                  value={doctor_deperment}
                  onChange={(e) => setdoctor_deperment(e.target.value)}
                >
                  <option value="">select Deperment</option>
                  {deperment_name.map((dpart, index) => {
                    return (
                      <option key={index} value={dpart}>
                        {dpart}
                      </option>
                    );
                  })}
                </select>

                <button type="submit" className="btn btn-primary">
                  Add New Doctor
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewAdmin;
