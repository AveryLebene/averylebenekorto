"use client";

import { MotionNextImage } from "./MotionNextImage";

type Item = Readonly<{ src: string; label: string }>;

type Props = Readonly<{
  items: readonly Item[];
}>;

/** Portrait mockups (mobile / tablet) use tall assets; landscape uses 16:9 desktops. */
function isPortraitScreenshot(src: string) {
  return /[-/](mobile|tablet|tab)\.png$/i.test(src);
}

export function ProjectDetailGallery({ items }: Props) {
  return (
    <ul className="grid grid-cols-1  gap-6 list-none p-0 m-0">
      {items.map((item) => {
        const portrait = isPortraitScreenshot(item.src);
        return (
          <li key={item.src}>
            <figure className="m-0">
              <div
                className={
                  portrait
                    ? "rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#333]/40 py-4 px-2 text-center"
                    : "aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#333]/40"
                }
              >
                <MotionNextImage
                  src={item.src}
                  alt=""
                  className={
                    portrait
                      ? "inline-block max-h-[min(85vh,52rem)] max-w-full w-auto h-auto object-contain align-middle"
                      : "w-full h-full object-contain object-top"
                  }
                  width={portrait ? 390 : 1280}
                  height={portrait ? 844 : 720}
                  sizes={portrait ? "(min-width: 768px) 480px, 90vw" : "(min-width: 768px) 800px, 100vw"}
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[#888] text-center">
                {item.label}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
