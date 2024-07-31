import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Message_Check = () => {
  const [message, setmessage] = useState([]);
  const { IsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/message/get_messages",
          { withCredentials: true }
        );
        console.log(res.data.data);
        setmessage(res.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (IsAuth) {
      fetchMessages();
    }
  }, [IsAuth]);
  if (!IsAuth) {
    navigate("/login");
  }
  return (
    <section className="page messages">
      <h1>Message</h1>
      <div className="banner">
        {message && message.length > 0 ? (
          message.map((message, index) => {
            return (
              <div key={index} className="card">
                <div className="details">
                  <p>
                    First Name: <span>{message.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{message.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{message.email}</span>
                  </p>
                  <p>
                    Phone: <span>{message.phone}</span>
                  </p>
                  <p>
                    Message: <span>{message.message}</span>
                  </p>
                </div>
                <div className="details"></div>
              </div>
            );
          })
        ) : (
          <h1>No Messages</h1>
        )}
      </div>
    </section>
  );
};

export default Message_Check;
