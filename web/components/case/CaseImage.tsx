import type { Img } from "@/lib/caseStudies";

/** Plain responsive <img>. Uses the srcSet from the media import when present; always lazy unless eager. */
export function CaseImage({ img, sizes = "100vw", className = "h-auto w-full", eager }: { img: Img; sizes?: string; className?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.srcSet ? sizes : undefined}
      width={img.w}
      height={img.h}
      alt={img.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={className}
    />
  );
}
