import { useWeb3React } from "@web3-react/core";
import { NavLink } from "react-router-dom";
import * as s from "../../styles/global"

const CreateLaunchpad = () => {
  const { library } = useWeb3React();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {library ? (
        <s.button
          href="#/publish"
          style={{
            whiteSpace: "nowrap",
            padding: 10,
            fontWeight: 700,
            paddingLeft: 30,
            paddingRight: 30,
            textDecoration: "none",
          }}
        >
          Create New IDO Pool
        </s.button>
      ) : null}
    </div>
  );
};

export default CreateLaunchpad;
