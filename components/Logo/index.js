import React from "react";
import Image from "next/image";

import defaultLogo from "../../public/logo.svg";

const Logo = ({ logoImg = defaultLogo }) => {
  return (
    <div className="logo__container">
      <div className="logo__img">
        <Image src={logoImg} alt="logo-img" />
      </div>
      {/* <div className="logo__text">bikearn.</div> */}
    </div>
  );
};

export default Logo;
