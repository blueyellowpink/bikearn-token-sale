import Link from "next/link";
import Image from "next/image";

import telegramIcon from "../../../public/telegram.svg";
import facebookIcon from "../../../public/facebook.svg";
import twitterIcon from "../../../public/twitter.svg";
import youtubeIcon from "../../../public/youtube.svg";

const menuItem = [
  {
    name: "telegram-icon",
    to: "https://t.me/BikearnGlobal",
    src: telegramIcon,
  },
  {
    name: "twitter-icon",
    to: "https://mobile.twitter.com/bikearn",
    src: twitterIcon,
  },
  {
    name: "facebook-icon",
    to: "https://www.facebook.com/Bikearn-114791187889515",
    src: facebookIcon,
  },
  {
    name: "youtube-icon",
    to: "https://www.youtube.com/channel/UCqx9LemhyDnL_eXoTnESYIA",
    src: youtubeIcon,
  },
];

const MenuSale = () => {
  return (
    <div className="menu-sale">
      <ul>
        {menuItem.map((item) => (
          <li key={item.name}>
            <Link href={item.to} passHref={true} >
              <a target="_blank">
                <Image src={item.src} alt={item.name} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSale;
