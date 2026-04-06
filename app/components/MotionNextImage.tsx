"use client";

import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState, type SyntheticEvent } from "react";
import { motionMediaDuration, motionSoftEase } from "@/lib/motion";

export function MotionNextImage({
  onLoad,
  onError,
  className,
  fill,
  ...rest
}: ImageProps) {
  const [visible, setVisible] = useState(false);

  const handleLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
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

  const wrapperClass = fill
    ? "absolute inset-0 size-full"
    : "relative block w-full h-full min-h-0";

  return (
    <motion.div
      className={wrapperClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: motionMediaDuration, ease: motionSoftEase }}
    >
      <Image
        {...rest}
        fill={fill}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </motion.div>
  );
}
