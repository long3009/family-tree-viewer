import React, { useCallback } from "react";
import classNames from "classnames";
import type { ExtNode } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";
import type { CustomNode } from "../const";

interface FamilyNodeProps {
  node: CustomNode;
  isRoot: boolean;
  isHover?: boolean;
  onClick: (node: CustomNode) => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export const FamilyNode = React.memo(function FamilyNode({
  node,
  isRoot,
  isHover,
  onClick,
  onSubClick,
  style,
}: FamilyNodeProps) {
  const clickHandler = useCallback(() => onClick(node), [node.id, onClick]);
  const clickSubHandler = useCallback(
    () => onSubClick(node.id),
    [node.id, onSubClick],
  );

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node.gender],
          isRoot && css.isRoot,
          isHover && css.isHover,
        )}
        onClick={clickHandler}
      >
        <div className={css.content}>
          <div className={css.name}>{node.info?.name}</div>
          <div>
            <img
              src={node.info?.avatar}
              alt="node.info?.name"
              width={50}
              height={50}
            />
          </div>
          <div>{node.info?.birth}</div>
        </div>
      </div>
      {node.hasSubTree && (
        <div
          className={classNames(css.sub, css[node.gender])}
          onClick={clickSubHandler}
        />
      )}
    </div>
  );
});
