import React, { useEffect, useState } from "react";
import Image from "next/image";

import useWindowDimensions from "../../../hooks/useWindowDimensions";
import smallToken from "../../../public/small-token.svg";
import bigToken from "../../../public/big-token.svg";
import bikeIcon from "../../../public/bike-icon.svg";
import {
  buyPreSale,
  claimPresale,
  getProgress,
  refundPresale,
} from "../../../services/token-sale";
import { toast } from "react-toastify";
const Card = ({ setLoading }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [time, setTime] = useState({ hour: "", minutes: "", seconds: "" });
  const [timeInterval, setTimeInterVal] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState();
  const [progress, setProgress] = useState(0);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      setPlaceholder("Enter Amount To Buy");
    } else {
      setPlaceholder(isPrivate ? "300$ ~ 900$" : "200 - 500$");
    }
  }, [height, width, isPrivate]);
  const getSaleProgress = async () => {
    setLoading(true);
    const res = await getProgress(isPrivate ? "private" : "public");
    setProgress(res >= 20 ? 100 : res * 4);
    setLoading(false);
  };
  useEffect(() => {
    setValue("");
    getSaleProgress();
    getTime();
    setTimeInterVal(
      setInterval(() => {
        getTime();
      }, 1000)
    );
  }, [isPrivate]);

  const dateRange = Date.UTC(2022, 4, 26, 11, 0, 0, 0) - new Date().getTime();
  const publicRange = new Date().getTime() - Date.UTC(2022, 4, 25, 8, 0, 0, 0);
  const claimDate = new Date().getTime() - Date.UTC(2022, 4, 27, 13, 30, 0, 0);
  const getTime = () => {
    const now = new Date().getTime();
    var distance = Date.UTC(2022, 4, 26, 11, 0, 0, 0) - now;

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
      setTime("");
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  const handleBuy = async () => {
    if (isPrivate) {
      if (!value || value > 900 || value < 300) {
        toast.error("Invalid amount!");
      } else {
        setLoading(true);
        await buyPreSale(value.toString(), isPrivate ? "private" : "public");
        setLoading(false);
      }
    } else {
      if (!value || value > 500 || value < 200) {
        toast.error("Invalid amount!");
      } else {
        setLoading(true);
        await buyPreSale(value.toString(), isPrivate ? "private" : "public");
        setLoading(false);
      }
    }
  };
  const handleClaim = async () => {
    setLoading(true);
    await claimPresale(isPrivate ? "private" : "public");
    setLoading(false);
  };
  return (
    <div className="card-sale">
      <div className="nav-tabs">
        <div
          className="tab"
          style={{ background: isPrivate ? "#fff" : "" }}
          onClick={() => {
            setIsPrivate(true);
          }}
        >
          <div>
            Private <span className="remove-text">sale</span>
          </div>
          <div
            className={`${
            "close"
            }-status`}
          >
            <div className="status_dot"></div>
            <div className="remove-text">
              {"Close"}
            </div>
          </div>
        </div>
        <div
          className="tab"
          style={{ background: !isPrivate ? "#fff" : "" }}
          onClick={() => {
              setIsPrivate(false);
          }}
        >
          <div>
            Public <span className="remove-text">sale</span>
          </div>
          <div
            className={`${
             "close"
            }-status`}
          >
            <div className="status_dot"></div>
            <div className="remove-text">
              {publicRange > 0 && dateRange > 0 && dateRange < 27 * 3600 * 1000
                ? "Open"
                : "Close"}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="time">
          <div className="open-close-date">
            <div className="remove-text">Open</div>
            <div className="date">
              {isPrivate ? `07:00` : `08:00`} AM 25 - 05
              <span className="remove-text"> - 2022</span>
            </div>
          </div>
          <div className="count-down count-down-desktop">
            <div className="number">{time.hour}</div>
            <div className="text">Hrs</div>
            <div className="cross"></div>
            <div className="number">{time.minutes}</div>
            <div className="text">Mins</div>
            <div className="cross"></div>
            <div className="number">{time.seconds}</div>
            <div className="text">Secs</div>
          </div>
          <div className="to-text">to</div>
          <div className="open-close-date">
            <div className="remove-text">Close</div>
            <div className="date">
              07:00 AM 26 - 05<span className="remove-text"> - 2022</span>
            </div>
          </div>
        </div>
        <div className="count-down count-down-mb">
          <div className="number">{time.hour}</div>
          <div className="text">Hrs</div>
          <div className="cross"></div>
          <div className="number">{time.minutes}</div>
          <div className="text">Mins</div>
          <div className="cross"></div>
          <div className="number">{time.seconds}</div>
          <div className="text">Secs</div>
        </div>
        <div className="line"></div>
        <div className="token-info">
          <div className="info">
            <div className="label">Price</div>
            <div className="font-bold font-size-20 token-price">
              1 RTE
              <span>
                <Image src={bikeIcon} alt="token" />
              </span>
              = {isPrivate ? `0.008` : `0.012`} $
              <span>
                <Image src={smallToken} alt="token" />
              </span>
            </div>
          </div>
          <div className="info">
            <div className="label">Total Sale</div>
            <div className="font-bold font-size-30 token-price total-sale">
              {isPrivate ? `180.000 $` : `100.000 $`}
              <span>
                <Image src={smallToken} alt="token" />
              </span>
            </div>
          </div>
        </div>
        <div className="token-info">
          <div className="info">
            <div className="label">Progress</div>
            <div className="font-bold font-size-30 total-sale">
              {(((isPrivate ? 180000 : 100000) * progress) / 100).toFixed(0)} $
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress > 25 ? `${Number(progress).toFixed(2)}%` : ""}
              <span className="big-token">
                <Image src={bigToken} alt="token" />
              </span>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="token-info">
          <div className="info">
            <div className="label remove-text">Vesting</div>
            <div className="font-bold font-size-18 info-content">
              {isPrivate
                ? "15 % TGE , 2 months cliff then linear daily vesting in 6 months"
                : "25% TGE , 1 monthly cliff, then linear monthly vesting in 3 months"}
            </div>
          </div>
        </div>
        <div className="token-info">
          <div className="info">
            <div className="label remove-text">Allocation</div>
            <div className="font-bold font-size-20 remove-text">
              {isPrivate ? "300$ ~ 900$" : "200 - 500$"}
            </div>
          </div>
        </div>
        <div className="group-button">
          <div className="input-area">
            <input
              placeholder={placeholder}
              value={value}
              onChange={handleValueChange}
            />
            <Image src={smallToken} alt="token" />
            <div
              className="max-button"
              onClick={() => setValue(isPrivate ? 900 : 500)}
            >
              Max
            </div>
          </div>
          <div className="buttons">
            <div
              className={`${
               `disable`
              }-button button`}
              // onClick={() => {
              //   if(dateRange >0) {
              //     handleBuy();
              //   }
              // }}
            >
              BUY NOW
            </div>
            <div
              className={`${
                claimDate > 0 ? `active` : 
                `disable`
              }-button button`}
              onClick={() => {
                if (claimDate > 0) {
                  handleClaim();
                }
              }}
            >
              CLAIM TOKEN
            </div>
          </div>
        </div>
        <div className="note">
          Users can be refunded after being listed 2 hours if the price is lower
          than {isPrivate ? "Private" : "Public"} sale price
        </div>
      </div>
    </div>
  );
};
export default Card;
