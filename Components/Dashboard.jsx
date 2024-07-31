import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { IsAuth, user } = useContext(AuthContext);
  const [appointment, setappointment] = useState([]);

  const navigate = useNavigate();

  const handleUpdatestatus = async (appointment_id, status) => {
    try {
      console.log(appointment_id, status);
      await axios
        .put(
          `http://localhost:4000/api/v1/appintment/update_appointment/${appointment_id}`,
          {
            status: status, // Update the status field
          },
          { withCredentials: true }
        )
        .then((response) => {
          // Update the appointment in the state
          setappointment((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === appointment_id
                ? { ...appointment, status: status } // Update the status of the specific appointment
                : appointment
            )
          );
          toast.success(response.data.message);
          console.log("Appointment updated successfully:", response.data);
        })
        .catch((error) => {
          toast.error(error.message);
          console.error("Error updating appointment:", error);
        });
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/appintment/get_appointment",
          { withCredentials: true }
        );
        // console.log(response.data.data);

        setappointment(response.data.data); // Assuming the API response contains an array of appointments
      } catch (error) {
        // setappointment("");
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
    if (!IsAuth) {
      navigate("/login");
    }
  }, [IsAuth]); // Add IsAuth to the dependency array to re-fetch when authentication changes

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docing" />
            <div className="content">
              <div>
                <p>Hello</p>
                <h5>
                  {user.data && `${user.data.firstName} ${user.data.lastName}`}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at
                eos laborum neque voluptate repudiandae quasi modi sapiente
                expedita veritatis.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointment</p>
            <h3>100</h3>
          </div>
          <div className="thirdBox">
            <p>Register Doctor</p>
            <h3>20</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointment</h5>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Deperment</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointment && appointment.length > 0
                ? appointment.map((data_appoint) => {
                    return (
                      <tr key={data_appoint._id}>
                        <td>{`${data_appoint.firstName} ${data_appoint.lastName}`}</td>
                        <td>{data_appoint.appointment_date}</td>
                        <td>{data_appoint.doctor_name.firstName}</td>
                        <td>{data_appoint.deperment}</td>
                        <td>
                          <select
                            onChange={(e) =>
                              handleUpdatestatus(
                                data_appoint._id,
                                e.target.value
                              )
                            }
                            className={
                              data_appoint.status === "Pending"
                                ? "value-pending"
                                : data_appoint.status === "Accepted"
                                ? "value-accepted"
                                : "value-rejected"
                            }
                            value={data_appoint.status}
                          >
                            <option value="Pending" className="value-pending">
                              Pending
                            </option>
                            <option value="Accepted" className="value-accepted">
                              Accepted
                            </option>
                            <option value="Rejected" className="value-rejected">
                              Rejected
                            </option>
                          </select>
                        </td>
                        <td>
                          {data_appoint.has_visited ? (
                            <GoCheckCircleFill className="green"></GoCheckCircleFill>
                          ) : (
                            <AiFillCloseCircle className="red"></AiFillCloseCircle>
                          )}
                        </td>
                      </tr>
                    );
                  })
                : "No Appointments Found!"}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
