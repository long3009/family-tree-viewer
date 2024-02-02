import React from "react";
import Dialog from "rc-dialog";
import { CustomNode } from "../const";
import "rc-dialog/assets/index.css";
import "./DialogInfo.css";
interface DialogProps {
  node?: CustomNode;
  isOpen?: boolean;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
const DialogInfo = ({ isOpen, node, onDismiss }: DialogProps) => {
  return (
    <Dialog
      title={"Thông tin chi tiết"}
      onClose={onDismiss}
      visible={isOpen}
      zIndex={1000}
      className="container"
    >
      {/* <h3>{node?.info?.name || ""} </h3>
      <div>
        <img
          src={node?.info?.avatar}
          alt={node?.info?.name}
          width={200}
          height={200}
        />
      </div>
      <div>
        {node?.info?.birth}
        {node?.info?.death !== "" ? ` - ${node?.info?.death}` : ""}
      </div>
      {node?.info?.note && <div>Thông tin khác:</div>}
      <div style={{ whiteSpace: "pre-line" }}>{node?.info?.note}</div> */}
      <div className="upc">
        <div
          className={
            node?.gender === "male" ? "gradiant-man" : "gradiant-woman"
          }
        ></div>
        <div className="profile-down">
          <img src={node?.info?.avatar} alt={node?.info?.name} />
          <div className="profile-title">{node?.info?.name || ""}</div>
          <div className="profile-year">
            {" "}
            {node?.info?.birth}
            {node?.info?.death !== "" ? ` - ${node?.info?.death}` : ""}
          </div>
          <div className="profile-description">{node?.info?.note}</div>
        </div>
      </div>
    </Dialog>
  );
};
export default DialogInfo;
