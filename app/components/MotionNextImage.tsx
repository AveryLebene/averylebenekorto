"use client";

import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { motionMediaDuration, motionSoftEase } from "@/lib/motion";

export function MotionNextImage({
  onLoadingComplete,
  onError,
  className,
  fill,
  ...rest
}: ImageProps) {
  const [visible, setVisible] = useState(false);

  const handleComplete = useCallback(
    (img: HTMLImageElement) => {
      setVisible(true);
      onLoadingComplete?.(img);
    },
    [onLoadingComplete]
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
        onLoadingComplete={handleComplete}
        onError={handleError}
      />
    </motion.div>
  );
}
