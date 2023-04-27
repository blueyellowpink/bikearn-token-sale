import Logo from '../../../components/Logo';
import MenuSale from './MenuSale';
import useWeb3 from '../../../hook/useWeb3';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { getWeb3 } from '../../../services/token-sale';
import { useEffect } from 'react';
const Nav = () => {
  const { height, width } = useWindowDimensions();
  const {account,setAccount} = useWeb3();
  const connectWallet = () => {
    getWeb3();
  }
  useEffect(()=>{
    if(width <1024 && account?.length > 0 ) {
      setAccount(`${account.slice(0,3)}...${account.slice(account.length -3, account.length)}`)
    }
  },[width,account])
  return (
    <div className="nav-sale">
      <div className="nav-sale__menu-container">
        <Logo />
        <MenuSale />
      </div>
      <button className="nav-sale__menu-button" onClick={connectWallet}>
        {account ? account : <>connect <span className="nav-sale__wallet-text">wallet</span></>}
      </button>
    </div>
  );
};

export default Nav;
