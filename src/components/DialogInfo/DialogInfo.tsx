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
    <Dialog title={"test"} onClose={onDismiss} visible={isOpen} zIndex={1000}>
      <h3>{node?.info?.name || ""} </h3>
    </Dialog>
  );
};
export default DialogInfo;
