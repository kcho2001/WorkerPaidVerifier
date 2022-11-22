import "./index.css";

export function Paid(props) {
  return (
    <div className="center dashboard">
      <div className="content">
        <p className="header"> Verification Dashboard</p>
        <div style={{ justifyContent: "center", flexDirection: "column" }}>
          <a href="https://goerli.etherscan.io/address/0xD260302a241A2CFBc1493676b4fA3f365870De59">
            <img src="photos/etherscan-logo-circle.png" className="iconImage" />
          </a>
          <p style={{ margin: 0, fontSize: "small" }}>
            Verify Information
          </p>
        </div>
        <div className="contentRow">
          <p className="text inline">
            Workers have been paid last: {props.recentPayment.month}/{props.recentPayment.day}/{props.recentPayment.year}
          </p>
        </div>
        <div className="contentRow">
          <p className="text inline">
            Most unpaid work days: &nbsp;{props.maxUnpaid} days
          </p>
        </div>
        <div className="contentRow">
          <p className="text inline"> Total number of workers:&nbsp; {props.workerLength}</p>
        </div>
      </div>
    </div>
  );
}
