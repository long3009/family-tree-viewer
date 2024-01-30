import React from "react";
import Dialog from "rc-dialog";
import { CustomNode } from "../const";
import "rc-dialog/assets/index.css";
interface DialogProps {
  node?: CustomNode;
  isOpen?: boolean;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
const DialogInfo = ({ isOpen, node, onDismiss }: DialogProps) => {
  return (
    <Dialog
      title={"Person Info"}
      onClose={onDismiss}
      visible={isOpen}
      zIndex={1000}
      style={{ textAlign: "center" }}
    >
      <h3>{node?.info?.name || ""} </h3>
      <div>
        <img src={node?.info?.avatar} alt={node?.info?.name} />
      </div>
      <div>
        {node?.info?.birth}
        {node?.info?.death !== "" ? ` - ${node?.info?.death}` : ""}
      </div>
    </Dialog>
  );
};
export default DialogInfo;
