import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IDOList from "../components/Modal/idoList";
import * as s from "../styles/global";
import { utils } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";

const LaunchpadNew = (props) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract);

  const location = useLocation();
  const navigate = useNavigate();

/*
  useEffect(() => {
    if (location.pathname === '/') navigate('/launchpad');
  }, []);
  */

  if (!contract.web3) {
    return null;
  }

  return (
    <>
      <div class="elementor elementor-33" style={{ width: '100%' }}>
        <div class="elementor-element elementor-element-5d08d7a4 e-flex e-con-boxed e-con e-parent" data-id="5d08d7a4" data-element_type="container" id="slider" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;content_width&quot;:&quot;boxed&quot;}" data-core-v316-plus="true">
          <div class="e-con-inner">
            <div class="elementor-element elementor-element-12754ec3 elementor-widget elementor-widget-heading" data-id="12754ec3" data-element_type="widget" data-widget_type="heading.default">
              <div class="elementor-widget-container">
                <h1 class="elementor-heading-title elementor-size-default">Then NEXT Generation Web3.0 Launchpad</h1>
              </div>
            </div>
            <div class="elementor-element elementor-element-5ea1a561 elementor-widget elementor-widget-heading" data-id="5ea1a561" data-element_type="widget" data-widget_type="heading.default">
              <div class="elementor-widget-container">
              {/*<p class="elementor-heading-title elementor-size-default">Full-scale Blockchain Gaming Ecosystem for IGOs &amp; NFT Pre-Sales</p>*/}
              </div>
            </div>
            <div class="elementor-element elementor-element-7c8f063e e-flex e-con-boxed e-con e-child" data-id="7c8f063e" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
              <div class="e-con-inner">
                <div class="elementor-element elementor-element-5ec35326 elementor-widget elementor-widget-styled-button" data-id="5ec35326" data-element_type="widget" data-widget_type="styled-button.default">
                  <div class="elementor-widget-container">
                    <div class="button-wrapper">
                      <a id="" class="btn btn-bordered active smooth-anchor" href="./#/launchpad">
                        <i class="icon-rocket me-2"></i>Explore IDOs </a>
                    </div>
                  </div>
                </div>
                {/*
                <div class="elementor-element elementor-element-281732db elementor-widget elementor-widget-styled-button" data-id="281732db" data-element_type="widget" data-widget_type="styled-button.default">
                  <div class="elementor-widget-container">
                    <div class="button-wrapper">
                      <a id="" class="btn btn-bordered-white" href="https://gameon.theme-land.com/apply-for-igo/">
                        <i class="icon-note me-2"></i>Apply Now </a>
                    </div>
                  </div>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <s.Container ai="center" bgcolor="#090a1a" style={{ paddingLeft: '5em', paddingRight: '5em' }}>
        <s.SpacerMedium />
        {/*
        <TextField
          fullWidth
          label={"Search by token address "}
          onChange={async (e) => {
            e.preventDefault();
            await utils.typewatch(2000);
            setAddress(e.target.value);
          }}
        />
      */}
        <IDOList tokenAddress={address} />
      </s.Container>
      <div class="elementor-33" style={{ width: '100%' }}>
        <div class="elementor-element elementor-element-1562f026 e-flex e-con-boxed e-con e-parent" data-id="1562f026" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}" data-core-v316-plus="true">
          <div class="e-con-inner">
            <div class="elementor-element elementor-element-7d67880 e-flex e-con-boxed e-con e-child" data-id="7d67880" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
              <div class="e-con-inner">
                <div class="elementor-element elementor-element-51d34783 e-flex e-con-boxed e-con e-child" data-id="51d34783" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
                  <div class="e-con-inner">
                    <div class="elementor-element elementor-element-19fbecbc e-flex e-con-boxed e-con e-child" data-id="19fbecbc" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
                      <div class="e-con-inner">
                        <div class="elementor-element elementor-element-20f930c6 intro elementor-widget elementor-widget-heading" data-id="20f930c6" data-element_type="widget" data-widget_type="heading.default">
                          <div class="elementor-widget-container">
                            <span class="elementor-heading-title elementor-size-default">Project</span>
                          </div>
                        </div>
                        <div class="elementor-element elementor-element-530a71b8 elementor-widget elementor-widget-heading" data-id="530a71b8" data-element_type="widget" data-widget_type="heading.default">
                          <div class="elementor-widget-container">
                            <h3 class="elementor-heading-title elementor-size-default">Multi-chain IGOs</h3>
                          </div>
                        </div>
                        <div class="elementor-element elementor-element-4f51c35e elementor-widget elementor-widget-heading" data-id="4f51c35e" data-element_type="widget" data-widget_type="heading.default">
                          <div class="elementor-widget-container">
                            <p class="elementor-heading-title elementor-size-default">Join IGOs on multiple blockchains in a single click. Support game by providing LP or just stake the game and get rewards.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-element elementor-element-55d378ca e-flex e-con-boxed e-con e-child" data-id="55d378ca" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
                  <div class="e-con-inner">
                    <div class="elementor-element elementor-element-1c67945b elementor-view-stacked elementor-shape-square elementor-position-left elementor-mobile-position-left elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="1c67945b" data-element_type="widget" data-widget_type="icon-box.default">
                      <div class="elementor-widget-container">
                        <link rel="stylesheet" href="./design/widget-icon-box.min.css" />
                        <div class="elementor-icon-box-wrapper">
                          <div class="elementor-icon-box-icon">
                            <span class="elementor-icon elementor-animation-">
                              <svg aria-hidden="true" class="e-font-icon-svg e-fab-discord" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="elementor-icon-box-content">
                            <h3 class="elementor-icon-box-title">
                              <span> Cross-Blockchain </span>
                            </h3>
                            <p class="elementor-icon-box-description"> Explore a seamless experience as our launchpad supports a multitude of blockchains. From Binance Smart Chain to Ethereum and beyond. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-element elementor-element-4e41bcb2 e-flex e-con-boxed e-con e-child" data-id="4e41bcb2" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
                  <div class="e-con-inner">
                    <div class="elementor-element elementor-element-606be9b8 elementor-view-stacked elementor-shape-square elementor-position-left elementor-mobile-position-left elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="606be9b8" data-element_type="widget" data-widget_type="icon-box.default">
                      <div class="elementor-widget-container">
                        <div class="elementor-icon-box-wrapper">
                          <div class="elementor-icon-box-icon">
                            <span class="elementor-icon elementor-animation-">
                              <svg aria-hidden="true" class="e-font-icon-svg e-fas-fire-alt" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="elementor-icon-box-content">
                            <h3 class="elementor-icon-box-title">
                              <span> Automated Liquidity </span>
                            </h3>
                            <p class="elementor-icon-box-description"> Whether you're a seasoned liquidity provider or a newcomer, our platform makes it easy to back projects and earn rewards. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-element elementor-element-62ef6bd5 e-flex e-con-boxed e-con e-child" data-id="62ef6bd5" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
                  <div class="e-con-inner">
                    <div class="elementor-element elementor-element-5339dad8 elementor-view-stacked elementor-shape-square elementor-position-left elementor-mobile-position-left elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="5339dad8" data-element_type="widget" data-widget_type="icon-box.default">
                      <div class="elementor-widget-container">
                        <div class="elementor-icon-box-wrapper">
                          <div class="elementor-icon-box-icon">
                            <span class="elementor-icon elementor-animation-">
                              <svg aria-hidden="true" class="e-font-icon-svg e-fas-rocket" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="elementor-icon-box-content">
                            <h3 class="elementor-icon-box-title">
                              <span> Staking Simplicity </span>
                            </h3>
                            <p class="elementor-icon-box-description"> Maximize your rewards with our straightforward staking process. Stake your gaming assets and watch as your rewards accumulate. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="elementor-element elementor-element-4c379237 e-flex e-con-boxed e-con e-child" data-id="4c379237" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
              <div class="e-con-inner">
                <div class="elementor-element elementor-element-650acf2b elementor-widget elementor-widget-html" data-id="650acf2b" data-element_type="widget" data-widget_type="html.default">
                  <div class="elementor-widget-container">
                    <div class="wrapper-animation d-none d-md-block">
                      <div class="blockchain-wrapper">
                        <div class="pyramid">
                          <div class="square">
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                          </div>
                        </div>
                        <div class="pyramid inverse">
                          <div class="square">
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                            <div class="triangle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Apply IDO */}
      <div class="elementor-33" style={{ width: '100%' }}>
        <div class="elementor-element elementor-element-7a9cf532 e-flex e-con-boxed e-con e-parent" data-id="7a9cf532" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}" data-core-v316-plus="true">
          <div class="e-con-inner">
            <div class="elementor-element elementor-element-14ebb16f e-flex e-con-boxed e-con e-child" data-id="14ebb16f" data-element_type="container" data-settings="{&quot;content_width&quot;:&quot;boxed&quot;}">
              <div class="e-con-inner">
                <div class="elementor-element elementor-element-495b6782 elementor-widget elementor-widget-CTA" data-id="495b6782" data-element_type="widget" data-widget_type="CTA.default">
                  <div class="elementor-widget-container">
                    <div class="row">
                      <div class="col-12 card project-card cta">
                        <div class="row align-items-center justify-content-center">
                          <div class="col-12 col-md-5 text-center">
                            <img fetchpriority="high" decoding="async" width="300" height="319" src="./design/cta_thumb.png" class="attachment-full size-full" alt="" srcset="https://gameon.theme-land.com/wp-content/uploads/2024/01/cta_thumb.png 300w, https://gameon.theme-land.com/wp-content/uploads/2024/01/cta_thumb-282x300.png 282w" sizes="(max-width: 300px) 100vw, 300px" />
                          </div>
                          <div class="col-12 col-md-6 mt-4 mt-md-0">
                            <h2 class="m-0">Apply for IGO</h2>
                            <p>Get access to huge set of tools to seamlessly handle your game's integration with blockchain.</p>
                            <a id="" class="btn btn-bordered active d-inline-block" href="#">
                              <i class="icon-rocket me-2"></i>Apply Now </a>
                          </div>
                        </div>
                        <a class="cta-link" href="#"></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchpadNew;
