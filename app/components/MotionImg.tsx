"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { motionMediaDuration, motionSoftEase } from "@/lib/motion";

export type MotionImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function MotionImg(props: MotionImgProps) {
  const { onLoad, onError, className, ...rest } = props;
  const [visible, setVisible] = useState(false);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setVisible(true);
      onLoad?.(e);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setVisible(true);
      onError?.(e);
    },
    [onError]
  );

  return (
    <motion.div
      className="w-full h-full min-h-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: motionMediaDuration, ease: motionSoftEase }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </motion.div>
  );
}
