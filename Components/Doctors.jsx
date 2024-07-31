import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctor, setdoctor] = useState([]);
  const { IsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctors"
        );
        console.log(response.data.data);
        setdoctor(response.data.data); // Assuming the API response contains an array of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [IsAuth]);

  if (!IsAuth) {
    navigate("/login");
  }

  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {doctor && doctor.length > 0 ? (
            doctor.map((item) => {
              return (
                <div key={item._id} className="card">
                  <img
                    src={item.doctor_avtar && item.doctor_avtar.url}
                    alt={item.firstName}
                  />
                  <h4>
                    {item.firstName} {item.lastName}
                  </h4>
                  <div className="details">
                    <p>
                      Email: <span>{item.email}</span>
                    </p>
                    <p>
                      Phone: <span>{item.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{item.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Gender: <span>{item.gender}</span>
                    </p>

                    <p>
                      Deperment:
                      <span>{item.doctor_deperment}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>NO Doctor Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
