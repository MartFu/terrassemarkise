import React from "react";

type CreasePosition = "top" | "bottom" | "left" | "right";

interface PaperCreaseProps {
  /** Which edge to place the crease */
  position?: CreasePosition;
  /** If true, extends to viewport width (requires parent with position: relative) */
  shouldOverflow?: boolean;
  /** Additional Tailwind classes */
  className?: string;
}

/**
 * PaperCrease - A subtle border component that creates a "pressed paper" effect
 */
export const PaperCrease: React.FC<PaperCreaseProps> = ({
  position = "top",
  shouldOverflow = false,
  className = "",
}) => {
  const baseClasses = "absolute bg-[#E4E4E8]";

  const positionClasses: Record<CreasePosition, string> = {
    top: shouldOverflow
      ? "left-1/2 top-0 h-px w-screen -translate-x-1/2 shadow-[0_0.5px] shadow-white"
      : "left-0 top-0 h-px w-full shadow-[0_0.5px] shadow-white",
    bottom: shouldOverflow
      ? "left-1/2 bottom-0 h-px w-screen -translate-x-1/2 shadow-[0_0.5px] shadow-white"
      : "left-0 bottom-0 h-px w-full shadow-[0_0.5px] shadow-white",
    left: shouldOverflow
      ? "left-0 top-1/2 w-px h-screen -translate-y-1/2 shadow-[0.5px_0] shadow-white"
      : "left-0 top-0 w-px h-full shadow-[0.5px_0] shadow-white",
    right: shouldOverflow
      ? "right-0 top-1/2 w-px h-screen -translate-y-1/2 shadow-[0.5px_0] shadow-white"
      : "right-0 top-0 w-px h-full shadow-[0.5px_0] shadow-white",
  };

  return (
    <span
      className={`${baseClasses} ${positionClasses[position]} ${className}`}
      aria-hidden="true"
    />
  );
};

interface PaperCreaseBoxProps {
  /** If true, horizontal creases extend to viewport width */
  shouldOverflow?: boolean;
  /** Content to render inside */
  children: React.ReactNode;
  /** Additional classes for the container */
  className?: string;
}

/**
 * PaperCreaseBox - A box component with creases on all sides
 */
export const PaperCreaseBox: React.FC<PaperCreaseBoxProps> = ({
  shouldOverflow = false,
  children,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <PaperCrease position="top" shouldOverflow={shouldOverflow} />
      <PaperCrease position="bottom" shouldOverflow={shouldOverflow} />
      <PaperCrease position="left" />
      <PaperCrease position="right" />
      {children}
    </div>
  );
};

export default PaperCrease;
