import React, { useState, useEffect } from "react";
import Nav from "./components/nav";
import Card from "./components/CardSale";
import Background from "./components/main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Popup from "./components/Popup";
import ReactLoading from "react-loading";
const TokenSale = () => {
  const [time, setTime] = useState({ hour: "", minutes: "", seconds: "" });
  const [timeInterval, setTimeInterVal] = useState(null);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getTime();
    setTimeInterVal(
      setInterval(() => {
        getTime();
      }, 1000)
    );
  }, []);
  const getTime = () => {
    const now = new Date().getTime();
    var distance = Date.UTC(2022, 4, 25, 7, 0, 0, 0) - now;
    if (distance > 0) {
      var days = Math.floor(
        (distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
      );
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      if (days > 0) hours = hours + days * 24;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime((prevState) => ({
        ...prevState,
        hour: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds,
      }));
    } else {
      clearInterval(timeInterval);
      setTime(0);
    }
  };
  return (
    <>
      <Nav />
      <div className="main-container">
        <Background />
        {time === 0 ? <Card setLoading={setLoading}/> : <Popup time={time} />}
        <ToastContainer />
        {loading && (
          <div className="loading">
            <ReactLoading
              type="bars"
              color="#FFC32A"
              height={"15%"}
              width={"15%"}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default TokenSale;
