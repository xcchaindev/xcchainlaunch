import React from 'react';
import * as s from "../../styles/global";
import { useApplicationContext } from '../../context/applicationContext';
import Greetings from './Greetings';
import { Web3Status } from '../../components/Web3Status';
import Settings from './Settings';
import SwitchNetwork from './SwitchNetwork';


export default function Manage() {
  const {
    isAdmin,
    isAppConfigured,
    configuredNetworks,
    domainSettings,
  } = useApplicationContext();

  return (
    <s.Wrapper>
      <s.BodyWrapper>
        <s.ContentWrapper>
          {(!domainSettings?.admin) ? (
            <Greetings />
          ) : (!isAdmin) ? (
            isAppConfigured ? (
              <>
                Connect to the Admin account to gain access to the management page.
              </>
            ) : (
              <>
                {configuredNetworks.length > 0 ? (
                  <>
                    <p style={{textAlign: 'center' }}>The application is not yet prepared for current network.</p>
                    <SwitchNetwork aviableChainIds={configuredNetworks} />
                    <p>Or connect to the Admin account and configure it.</p>
                    <s.SpacerSmall />
                    <Web3Status />
                  </>
                ) : (
                  <>
                    <p>The application is not yet prepared. Connect to the Admin account and configure the main settings.</p>
                    <s.SpacerSmall />
                    <Web3Status />
                  </>
                )}
              </>
            )
          ) : (
            <Settings />
          )}
          </s.ContentWrapper>
        </s.BodyWrapper>
    </s.Wrapper>
  );
}
