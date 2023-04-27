import React from "react";
import Image from "next/image";
import popup from "../../../public/popup.jpg";
const Popup = ({ time }) => {
  return (
    <div className="popup">
      <div></div>
      <Image src={popup} />
      <div className="time">
        <div className="count-down count-down-desktop">
          <div className="remove-text-left">Only</div>
          <div className="unit">
            <div className="number">{time?.hour}</div>
            <div className="text">Hrs</div>
          </div>

          <div className="cross"></div>
          <div className="unit">
            <div className="number">{time?.minutes}</div>
            <div className="text">Mins</div>
          </div>
          <div className="cross"></div>
          <div className="unit">
            <div className="number">{time?.seconds}</div>
            <div className="text">Secs</div>
          </div>
          <div className="remove-text-right">Left to go</div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
