import React, { useState, useEffect } from "react";
import { getWeb3 } from "../services/token-sale";

const useWeb3 = () => {
  const [account, setAccount] = useState();
  const [web3, setWeb3] = useState();
  const getAccount = async () => {
    const web3 = await getWeb3();
    setWeb3(web3);
    if(web3) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

  };
  useEffect(() => {
      getAccount();
  }, []);
  return { web3, account, setAccount };
};
export default useWeb3;
