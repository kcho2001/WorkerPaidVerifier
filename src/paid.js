import "./index.css";

/**
 * @param props Props that are set when rendering Paid screen. Props are set in App.js
 * @returns 
 */
export function Paid(props) {
  return (
    <div className="center dashboard">
      <div className="content">
        <p className="header"> Verification Dashboard</p>

        {/* Setting up icon of Etherscan as a link to the blockexplorer */}
        <div style={{ justifyContent: "center", flexDirection: "column" }}>
          <a href="https://goerli.etherscan.io/address/0xD260302a241A2CFBc1493676b4fA3f365870De59">
            <img src="photos/etherscan-logo-circle.png" className="iconImage" />
          </a>
          <p style={{ margin: 0, fontSize: "small" }}>
            Verify Information
          </p>
        </div>

        {/* Stating workers have not been paid sufficiently */}
        <div className="contentRow" style={{ justifyContent: "center" }}>
          <p className="green"> Workers have been sufficiently paid</p>
        </div>

        {/* Stating when workers have been paid last */}
        <div className="contentRow">
          <p className="text">
            Workers have been paid last: {props.recentPayment.month}/{props.recentPayment.day}/{props.recentPayment.year}
          </p>
        </div>

        {/* Stating the most unpaid work days */}
        <div className="contentRow">
          <p className="text">
            Most unpaid work days: &nbsp;{props.maxUnpaid} days
          </p>
        </div>

        {/* Stating total number workers */}
        <div className="contentRow">
          <p className="text"> Total number of workers:&nbsp; {props.workerLength}</p>
        </div>
      </div>
    </div>
  );
}
