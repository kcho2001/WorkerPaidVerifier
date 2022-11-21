import "./index.css";

export function Paid(props) {
  return (
    <div className="center dashboard">
      <div className="content">
        <p className="header">Workers have been paid!</p>
        <div>
          <a href="https://goerli.etherscan.io/address/0xD260302a241A2CFBc1493676b4fA3f365870De59">
            Blockexplorer
          </a>
        </div>
        <div>
          <p className="text inline"> Total number of workers: </p>{" "}
          <p className="text inline"> {props.workerLength} </p>
        </div>
        <div>
          <p className="text inline">
            Most days a worker hasn't been paid for work is:{" "}
          </p>{" "}
          <p className="text inline">{props.maxUnpaid} </p>{" "}
          <p className="text inline"> days</p>
        </div>
      </div>
    </div>
  );
}
