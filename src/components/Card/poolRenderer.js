import BigNumber from "bignumber.js";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getValidImageUrl,
  tokenAmountFromWei
} from "../../utils/utils";
import * as s from "../../styles/global";
import ProgressBar from "../Modal/ProgressBar";
import { utils } from "../../utils";
import * as Web3Utils from "web3-utils";
import imageSolid from "../../assets/images/image-solid.png"
import { useApplicationContext } from "../../context/applicationContext";
import { CURRENCY } from '../../assets/images/'

const PoolRenderer = (props) => {
  const contract = useSelector((state) => state.contract);
  const [image, setImage] = useState("");
  const {
    pool: idoInfo,
    pool: {
      start,
      end,
      metadata,
      idoAddress,
      tokenName,
      tokenSymbol,
      softCap,
      hardCap,
      progress,
      idoType,
      payToken,
    }
  } = props;

  const {
    baseCurrencySymbol,
    domainSettings: {
      ipfsInfuraDedicatedGateway
    },
  } = useApplicationContext();

  const card = useRef(null);

  const isStarted = parseInt(start) < (parseInt(Date.now() / 1000));
  const hasEnded = parseInt(end) < (parseInt(Date.now() / 1000));

  useEffect(() => {
    if (idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash) {
      setImage(getValidImageUrl(idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash, ipfsInfuraDedicatedGateway));
    }
  }, [idoInfo, idoInfo.metadata.image, idoInfo.metadata.imageHash, ipfsInfuraDedicatedGateway]);
  
  /*
return (
  <s.Card
    ref={card}
    ai="center"
    style={{ maxWidth: 500, margin: 20, minWidth: 400 }}
  >
    Loading
  </s.Card>
)
*/
  // if (!utils.isValidPool(idoInfo) || !idoInfo) {
  //   return (
  //     <s.Card
  //       ref={card}
  //       ai="center"
  //       style={{ maxWidth: 500, margin: 20, minWidth: 400 }}
  //     >
  //       Loading
  //     </s.Card>
  //   );
  // }
  if (!idoAddress || !metadata || !tokenName || !tokenSymbol) return null;
  
  const payCurrency = (idoType === `ERC20`) ? idoInfo.payToken.symbol : baseCurrencySymbol
  const formatWei = (weiValue, dp = 18) => {
    return Number(
      BigNumber(
        BigNumber(
          (idoType === `ERC20`)
            ? utils.tokenAmountFromWei(weiValue, payToken.decimals)
            : Web3Utils.fromWei(weiValue, "ether")
        ).toNumber()
      ).toFormat(dp)
    ) + " " + payCurrency
  }
  
  // hardCap / tokenRate
  const totalTokens = BigNumber(idoInfo.finInfo.hardCap).div(idoInfo.finInfo.tokenPrice)
  const soldTokens = totalTokens.minus(utils.tokenAmountFromWei(idoInfo.unsold, idoInfo.tokenDecimals))
  /* Count down renderer */
  const countDownRenderer = (opts) => {
    const { days, hours, minutes, seconds, completed } = opts
    if (completed) {
      // Render a completed state
      return (
        <div className="countdown d-flex">
          <span className="countdown-value days-bottom">{`...`}</span>
        </div>
      )
    } else {
      return (
        <div className="countdown d-flex">
          {(days > 0) && (
            <div className="countdown-container days">
              <span className="countdown-value days-bottom">{days}</span>
              <span className="countdown-heading days-top">d</span>
            </div>
          )}
          {(hours > 0) && (
            <div className="countdown-container hours">
            <span className="countdown-value hours-bottom">{hours}</span>
              <span className="countdown-heading hours-top">h</span>
            </div>
          )}
          <div className="countdown-container minutes">
            <span className="countdown-value minutes-bottom">{minutes}</span>
            <span className="countdown-heading minutes-top">m</span>
          </div>
          <div className="countdown-container seconds">
            <span className="countdown-value seconds-bottom">{seconds}</span>
            <span className="countdown-heading seconds-top">s</span>
          </div>
        </div>
      )
    }
  }
  /* ------------------- */
  return (
    <div className="col-12 col-sm-4 item filter-item-1 shuffle-item shuffle-item--visible" style={{padding: '0.5em'}}>
    
      <div className="card project-card">
        <div className="media">
          <a className="portfolio-thumb" href={`#/launchpad/${idoAddress}`}>
            <img
              decoding="async"
              className="attachment-gameon-grid-image size-gameon-grid-image wp-post-image"
              sizes="(max-width: 518px) 100vw, 518px"
              src={image}
              onError={(e) => {
                setImage(imageSolid);
              }}
              />
          </a>
          <div className="media-body ms-4">
            <NavLink
              to={"/launchpad/" + idoAddress}
              style={{
                textDecoration: "none",
                color: "white",
                width: "100%",
              }}
            >
            <h4 className="m-0">{metadata.description}</h4>
            </NavLink>
            <div className="countdown-times">
              {hasEnded ? (
                <Badge bg="secondary">Ended</Badge>
              ) : isStarted ? (
                <Badge bg="success">Started</Badge>
              ) : (
                <Badge bg="secondary">Not started</Badge>
              )}
              {
                !hasEnded && (
                  <>
                    <h6 className="my-2">
                      {isStarted
                        ? "End in:"
                        : "Start in:"}
                    </h6>
                    <Countdown
                      renderer={countDownRenderer}
                      date={
                        isStarted
                          ? parseInt(end) * 1000
                          : parseInt(start) * 1000
                      }
                    />
                  </>
                )
              }
            </div>
          </div>
        </div>
        
        <div className="card-body p-0">
          <div className="items">
            <div className="single-item">
              <span>Soft cap:</span>
              <span>&nbsp;</span>
              <span>{formatWei(softCap)}</span>
            </div>
            <div className="single-item">
              <span>Hard cap:</span>
              <span>&nbsp;</span>
              <span>{formatWei(hardCap)}</span>
            </div>
            {/*
            <div className="single-item">
              <span>Hard cap:</span>
              <span>&nbsp;</span>
              <span>{formatWei(hardCap)}</span>
            </div>
            */}
          </div>
          <div className="item-progress">
          
            <div className="progress" style={{position: 'relative'}}>
              <div className="progress-bar" style={{ width: progress+'%' }}>
                {progress > 10 && (
                  <span>{progress}{`%`}</span>
                )}
              </div>
              {progress <= 10 && (
                <span style={{
                  position: 'absolute',
                  left: '0px',
                  right: '0px',
                  textAlign: 'center',
                  lineHeight: '1.8rem',
                  color: '#FFF',
                }}>{progress}{`%`}</span>
              )}
            </div>
            <div className="progress-sale d-flex justify-content-between mt-3">
              <span>{soldTokens.toNumber()}{`/`}{totalTokens.toNumber()}{` `}{idoInfo.tokenSymbol}</span>
              <span>{formatWei((idoInfo.idoType == 'NATIVE') ? idoInfo.totalInvestedETH : idoInfo.totalInvestedERC)}</span>
            </div>
          </div>
        </div>
        
        <div className="project-footer d-flex align-items-center">
          <a className="btn btn-bordered-white btn-smaller" href={`#/launchpad/${idoAddress}`}>Participate</a>
          <div className="social-share ms-auto">
            <ul className="d-flex list-unstyled m-0">
              {metadata && metadata.links && metadata.links.website && (
                <li>
                  <a href={metadata.links.website}>
                    <svg className="svg-inline--fa fa-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                     <path fill="currentColor" xmlns="http://www.w3.org/2000/svg" d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M172.211,41.609    c-24.934,27.119-44.68,66.125-56.755,111.992H49.749C75.179,102.741,118.869,62.524,172.211,41.609z M25.6,256    c0-26.999,5.077-52.727,13.662-76.8h70.494c-4.608,24.294-7.356,49.963-7.356,76.8s2.748,52.506,7.347,76.8H39.262    C30.677,308.727,25.6,283,25.6,256z M49.749,358.4h65.707c12.083,45.867,31.821,84.872,56.755,111.991    C118.869,449.476,75.179,409.259,49.749,358.4z M243.2,485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2V485.188z     M243.2,332.8H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634,7.74-76.8H243.2V332.8z M243.2,153.6H141.841    C161.323,85.052,199.39,35.063,243.2,26.812V153.6z M462.251,153.6h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992    C393.131,62.524,436.821,102.741,462.251,153.6z M268.8,26.812c43.81,8.252,81.877,58.24,101.359,126.788H268.8V26.812z     M268.8,179.2h107.46c4.924,24.166,7.74,49.997,7.74,76.8s-2.816,52.634-7.74,76.8H268.8V179.2z M268.8,485.188V358.4h101.359    C350.677,426.948,312.61,476.937,268.8,485.188z M339.789,470.391c24.934-27.127,44.672-66.125,56.755-111.991h65.707    C436.821,409.259,393.131,449.476,339.789,470.391z M402.244,332.8c4.608-24.294,7.356-49.963,7.356-76.8    s-2.748-52.506-7.347-76.8h70.494c8.576,24.073,13.653,49.801,13.653,76.8c0,27-5.077,52.727-13.662,76.8H402.244z"/>
                    </svg>
                  </a>
                </li>
              )}
              {metadata && metadata.links && metadata.links.twitter && (
                <li>
                  <a href={metadata.links.twitter} target="_blank">
                    <svg className="svg-inline--fa fa-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </a>
                </li>
              )}
              {metadata && metadata.links && metadata.links.telegram && (
                <li>
                  <a href={metadata.links.telegram} target="_blank">
                    <svg className="svg-inline--fa fa-telegram" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"></path>
                    </svg>
                  </a>
                </li>
              )}
              {metadata && metadata.links && metadata.links.discord && (
                <li>
                  <a href={metadata.links.discord} target="_blank">
                    <svg className="svg-inline--fa fa-discord" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                    </svg>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="blockchain-icon">
          <img decoding="async" src={CURRENCY[idoInfo.chainId]} alt="" style={{ maxWidth: '32px' }} />
        </div>
      </div>
      
    </div>
  )
  return (
    <s.Card ref={card} style={{ maxWidth: 500, margin: 20, minWidth: 400 }}>
      <NavLink
        to={"/launchpad/" + idoAddress}
        style={{
          textDecoration: "none",
          color: "white",
          width: "100%",
        }}
      >
        <s.UpperCard fd="row" jc="space-between" ai="center">
          <s.Container flex={1} ai="center">
            <img
              style={{ width: 100, height: 100, borderRadius: 20 }}
              src={image}
              onError={(e) => {
                setImage(imageSolid);
              }}
            ></img>
          </s.Container>
          <s.SpacerSmall />
          <s.Container flex={3} ai="center" style={{ paddingLeft: 5 }}>
            <s.TextDescriptionEllipsis
              style={{ textAlign: "center" }}
              fs={"26px"}
            >
              {tokenName}
            </s.TextDescriptionEllipsis>
            <s.TextID>${tokenSymbol}</s.TextID>
          </s.Container>
        </s.UpperCard>
        <s.SpacerSmall />
        <s.Container fd="row" jc="flex-start">
          {hasEnded ? (
            <Badge bg="secondary">Ended</Badge>
          ) : isStarted ? (
            <Badge bg="success">Started</Badge>
          ) : (
            <Badge bg="secondary">Not started</Badge>
          )}
        </s.Container>
        <s.SpacerXSmall />
        <s.TextID>Description</s.TextID>
        <s.TextField>
          <s.TextDescription>{metadata.description}</s.TextDescription>
          <s.BlurTextField></s.BlurTextField>
        </s.TextField>
        <s.SpacerSmall />
        <s.Container fd="row">
          <s.Container ai="center" flex={1}>
            <s.TextID fullWidth>Soft cap</s.TextID>
            {formatWei(softCap)}
          </s.Container>
          <s.Container ai="center" flex={1}>
            <s.TextID fullWidth>Hard cap</s.TextID>
            {formatWei(hardCap)}
          </s.Container>
        </s.Container>
        <s.SpacerSmall />
        {
          !hasEnded && (
            <>
              <s.TextID>
                {isStarted
                  ? "End in"
                  : "Start in"}
              </s.TextID>
              <Countdown
                date={
                  isStarted
                    ? parseInt(end) * 1000
                    : parseInt(start) * 1000
                }
              />
            </>
          )
        }
        <s.TextID>Progress</s.TextID>
        <ProgressBar now={progress} />
      </NavLink>
    </s.Card>
  );
};
export default PoolRenderer;
