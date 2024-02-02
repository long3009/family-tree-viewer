import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import classNames from "classnames";
import { create } from "pinch-zoom-pan";

import css from "./PinchZoomPan.module.css";
import { NODE_WIDTH, NODE_HEIGHT } from "../const";
interface PinchZoomPanProps {
  min?: number;
  max?: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
export interface RefObject {
  SetFocus: (top: number, left: number) => void;
}

export const PinchZoomPan = forwardRef(
  (props: PinchZoomPanProps, ref?: Ref<RefObject>) => {
    const { min, max, captureWheel, className, style, children } = props;
    const root = useRef<HTMLDivElement>(null);
    const canvas = useRef<any>();
    useEffect(() => {
      const element = root.current;
      if (!element) return;
      canvas.current = create({
        element,
        minZoom: min,
        maxZoom: max,
        captureWheel,
      });
      return canvas.current.destroy;
    }, [min, max, captureWheel]);

    useImperativeHandle(ref, () => ({ SetFocus }));
    const SetFocus = (x: number, y: number) => {
      console.log("canvas update", x, y);
      canvas?.current.update({
        x,
        y,
        z: 1,
      });
    };
    return (
      <div ref={root} className={classNames(className, css.root)} style={style}>
        <div className={css.point}>
          <div className={css.canvas}>{children}</div>
        </div>
      </div>
    );
  },
);
