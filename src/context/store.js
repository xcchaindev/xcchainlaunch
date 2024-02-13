import BigNumber from "bignumber.js";
import React, { createContext, useState, useEffect } from "react";

import { isAddress } from '../utils/utils'

export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [icon, setIcon] = useState("");
  const [address, setAddress] = useState("");
  const [tokenRate, setTokenRate] = useState("");
  const [softCap, setSoftCap] = useState("");
  const [hardCap, setHardCap] = useState("");
  const [router, setRouter] = useState(-1);
  const [minETH, setMinETH] = useState("");
  const [maxETH, setMaxETH] = useState("");
  // v2 - erc20-erc20 pool
  const [useERC20ForBuy, setUseERC20ForBuy] = useState(false)
  const [erc20ForBuyAddress, setErc20ForBuyAddress] = useState('')
  const [erc20ForBuyInfo, setErc20ForBuyInfo] = useState(null)
  // -----

  const [isAddLiquidityEnabled, setIsAddLiquidityEnabled] = useState(false);
  const [liquidityPercentage, setLiquidityPercentage] = useState("");
  const [listingRate, setListingRate] = useState("");

  const [start, setStart] = useState( new Date() );
  const [end, setEnd] = useState( new Date());
  const [unlock, setUnlock] = useState(new Date());
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [description, setDescription] = useState("");

  const [tokenError, setTokenError] = useState({});
  const [idoError, setIdoError] = useState({});

  const [tokenInformation, setTokenInformation] = useState(null);
  const [idoInformation, setIdoInformation] = useState(null);
  const [account, setAccount] = useState(null);

  const [allowRefund, setAllowRefund] = useState(true)
  const [allowSoftWithdraw, setAllowSoftWithdraw] = useState(false)
  
  const tokenFormValidate = () => {
    let errors = {};
    let formIsValid = true;
    if (!tokenInformation) {
      formIsValid = false;
      errors["token"] = "Contract is not valid";
    }
    setTokenError(errors);
    return formIsValid;
  };

  useEffect(() => {
    setTokenError({})
  }, [address])

  const idoFormValidate = () => {
    let errors = {};
    let formIsValid = true;
    
    if (useERC20ForBuy && (!isAddress(erc20ForBuyAddress) || !erc20ForBuyInfo)) {
      formIsValid = false
      errors['erc20ForBuy'] = `Token address not valid`
    }
    if (BigNumber(softCap).gte(BigNumber(hardCap))) {
      formIsValid = false;
      errors["softCap"] = "Soft cap cannot less than Hard cap";
    }
    if (BigNumber(minETH).gt(BigNumber(softCap))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot greater than Soft cap";
    }
    if (BigNumber(maxETH).gt(BigNumber(hardCap))) {
      formIsValid = false;
      errors["maxETH"] = "Maximum buy cannot greater than Hard cap";
    }
    if (BigNumber(minETH).gte(BigNumber(maxETH))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot less than Maximum buy";
    }
    if (BigNumber(tokenRate).lte(BigNumber(0))) {
      formIsValid = false;
      errors["tokenRate"] = "Token rate cannot be zero";
    }
    if (BigNumber(minETH).lte(BigNumber(0))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot be zero";
    }
    if (BigNumber(softCap).lte(BigNumber(0))) {
      formIsValid = false;
      errors["softCap"] = "Soft cap cannot be zero";
    }
    if (BigNumber(hardCap).lte(BigNumber(0))) {
      formIsValid = false;
      errors["hardCap"] = "Hard cap cannot be zero";
    }
    if (BigNumber(start.getTime()).gte(BigNumber(end.getTime()))) {
      formIsValid = false;
      errors["start-end"] = "Start date cannot less than End date";
    }
    if (BigNumber(end.getTime()).gte(BigNumber(unlock.getTime())) && !useERC20ForBuy) {
      formIsValid = false;
      errors["unlock"] = "Unlock date cannot less than End date";
    }
    if (tokenRate == "") {
      formIsValid = false;
      errors["tokenRate"] = "Field cannot emypty";
    }
    if (softCap == "") {
      formIsValid = false;
      errors["softCap"] = "Field cannot emypty";
    }
    if (hardCap == "") {
      formIsValid = false;
      errors["hardCap"] = "Field cannot emypty";
    }
    if (minETH == "") {
      formIsValid = false;
      errors["minETH"] = "Field cannot emypty";
    }
    if (maxETH == "") {
      formIsValid = false;
      errors["maxETH"] = "Field cannot emypty";
    }
    if (isAddLiquidityEnabled) {
      if (BigNumber(liquidityPercentage).lte(BigNumber(50))) {
        formIsValid = false;
        errors["liquidityPercentage"] = "Liquidity should more than 50%";
      }
      if (BigNumber(liquidityPercentage).gt(BigNumber(100))) {
        formIsValid = false;
        errors["liquidityPercentage"] =
          "Liquidity should less than or equal 100%";
      }
      if (BigNumber(listingRate).lte(BigNumber(0))) {
        formIsValid = false;
        errors["listingRate"] = "Listing rate cannot be zero";
      }
      if (liquidityPercentage == "") {
        formIsValid = false;
        errors["liquidityPercentage"] = "Field cannot emypty";
      }
      if (listingRate == "") {
        formIsValid = false;
        errors["listingRate"] = "Field cannot emypty";
      }
    }
    // if (router < 0) {
    //   formIsValid = false;
    //   errors["router"] = "Field cannot emypty";
    // }

    setIdoError(errors);
    return formIsValid;
  };

  const store = {
    address: [address, setAddress],
    tokenRate: [tokenRate, setTokenRate],
    // erc20-erc20 pool
    useERC20ForBuy: [useERC20ForBuy, setUseERC20ForBuy],
    erc20ForBuyAddress: [erc20ForBuyAddress, setErc20ForBuyAddress],
    erc20ForBuyInfo: [erc20ForBuyInfo, setErc20ForBuyInfo],
    allowRefund: [ allowRefund, setAllowRefund ],
    allowSoftWithdraw: [ allowSoftWithdraw, setAllowSoftWithdraw ],
    // ----
    softCap: [softCap, setSoftCap],
    hardCap: [hardCap, setHardCap],
    router: [router, setRouter],
    minETH: [minETH, setMinETH],
    maxETH: [maxETH, setMaxETH],
    isAddLiquidityEnabled: [isAddLiquidityEnabled, setIsAddLiquidityEnabled],
    liquidityPercentage: [liquidityPercentage, setLiquidityPercentage],
    listingRate: [listingRate, setListingRate],
    start: [start, setStart],
    end: [end, setEnd],
    unlock: [unlock, setUnlock],
    tokenInformation: [tokenInformation, setTokenInformation],
    idoInformation: [idoInformation, setIdoInformation],
    account: [account, setAccount],
    error: [error, setError],
    tokenFormValidate,
    tokenError: tokenError,
    idoFormValidate,
    idoError: idoError,
    icon: [icon, setIcon],
    description: [description, setDescription],
    discord: [discord, setDiscord],
    telegram: [telegram, setTelegram],
    twitter: [twitter, setTwitter],
    website: [website, setWebsite],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => React.useContext(StoreContext);
