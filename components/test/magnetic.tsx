/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, type ReactNode } from "react";

// ============================================================================
// GENERIC RADIAL REVEAL COMPONENT
// ============================================================================

export interface RadialRevealProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  /** Content to show in the revealed state */
  revealContent: ReactNode;
  /** Content to show in the default state */
  children: ReactNode;
  /** Width of the reveal container (Tailwind class) */
  revealWidth?: string;
  /** Height of the reveal container (Tailwind class) */
  revealHeight?: string;
  /** Horizontal center of the reveal (0-100) */
  x?: number;
  /** Vertical center of the reveal (0-100) */
  y?: number;
  /** Enable parallax effect on reveal content */
  enableParallax?: boolean;
  /** Strength of parallax effect (0-1) */
  parallaxStrength?: number;
  /** Duration of reveal animation in ms */
  revealDuration?: number;
  /** Duration of hide animation in ms */
  hideDuration?: number;
  /** CSS filter to apply to reveal content */
  revealFilter?: string;
  /** Z-index of reveal container */
  revealZIndex?: number;
  /** Additional className for reveal container */
  revealClassName?: string;
  /** Callback when hover state changes */
  onHoverChange?: (isHovered: boolean) => void;
}

export const RadialReveal: React.FC<RadialRevealProps> = ({
  revealContent,
  children,
  parallaxStrength = 0,
  x = 75, // Default to center
  y = 50,
  revealDuration = 800,
  hideDuration = 600,
  revealFilter = "none",
  revealZIndex = 50,
  revealClassName = "",
  revealHeight,
  revealWidth,
  enableParallax = false,
  onHoverChange,
  ...props
}) => {
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}%`);
    (e.currentTarget as HTMLElement).style.setProperty("--y", `${y}%`);
  };

  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      {...props}
      className="relative group"
      onMouseMove={handleMouseMove}
      style={
        {
          // Mapping props to variables allows the CSS to remain generic
          "--reveal-duration": `${revealDuration}ms`,
          "--hide-duration": `${hideDuration}ms`,
          "--parallax-strength": enableParallax ? parallaxStrength : 0,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "absolute pointer-events-none inset-0 z-50 transition-[clip-path,scale] duration-700",
          "clip-path-[circle(0%_at_var(--x,50%)_var(--y,50%))] group-hover:clip-path-[circle(150%_at_var(--x,50%)_var(--y,50%))]",
          "scale-0 group-hover:scale-100",
          revealHeight,
          revealWidth,
          revealClassName,
        )}
        style={{
          top: `${y}%`,
          left: `${x}%`,
          transform: `translate(-50%, -50%)`,
          zIndex: revealZIndex,
          transitionDuration: "var(--hide-duration)",
          // We use a different duration for the hover-in state
          transitionProperty: "clip-path",
        }}
      >
        <div
          style={{
            filter: revealFilter,
            // Centered Parallax math
            transform: `translate(
              calc((var(--x, 50%) - 50%) * var(--parallax-strength)), 
              calc((var(--y, 50%) - 50%) * var(--parallax-strength))
            ) scale(1.1)`,
          }}
        >
          {revealContent}
        </div>
      </div>
      {children}
    </div>
  );
};

// ============================================================================
// GENERIC LIST ITEM COMPONENT
// ============================================================================

export interface ReadialRevealItemProps<T = unknown> {
  /** The data for this item */
  item: T;
  /** Index of the item in the list */
  index?: number;
  /** Render function for the reveal content */
  renderReveal: (item: T) => ReactNode;
  /** Additional className for the list item */
  className?: string;
  /** Props to pass to RadialReveal component */
  revealProps?: Partial<RadialRevealProps>;
  /** Callback when item is clicked */
  onClick?: (item: T) => void;
}

export const ReadialRevealItem = <T,>({
  item,
  index,
  renderReveal,
  className = "",
  revealProps = {},
  onClick,
  children,
}: React.PropsWithChildren<ReadialRevealItemProps<T>>) => {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <RadialReveal revealContent={renderReveal(item)} {...revealProps}>
      <div className={cn(className)} onClick={handleClick}>
        {children}
      </div>
    </RadialReveal>
  );
};

// ============================================================================
// EXAMPLE IMPLEMENTATION (can be deleted/replaced)
// ============================================================================

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

export const ProjectShowcase: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Palladio",
      subtitle: "Architectural Vision",
      image: "/assets/product-images/palladio_profile.png",
      color: "#E8D5C4",
    },
    {
      id: 2,
      title: "Corsica",
      subtitle: "Mediterranean Dreams",
      image: "/assets/product-images/corsica_profile.png",
      color: "#C4D5E8",
    },
    {
      id: 3,
      title: "Jamaica",
      subtitle: "Tropical Essence",
      image: "/assets/product-images/jamaica_profile.png",
      color: "#D4E8C4",
    },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#0A0A0A] p-8">
      <div className="w-full max-w-5xl">
        <header className="mb-16">
          <h1 className="text-6xl font-light text-white tracking-tight mb-2">
            Portfolio
          </h1>
          <p className="text-gray-500 text-lg">Selected works, 2024–2025</p>
        </header>

        <ul className="space-y-0 border-t border-gray-800">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="border-b border-gray-800 cursor-pointer relative"
            >
              <ReadialRevealItem
                item={project}
                index={index}
                renderReveal={(proj) => (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                )}
                revealProps={{
                  revealWidth: "w-[30rem]",
                  revealHeight: "h-80",
                  enableParallax: true,
                  parallaxStrength: 0.3,
                  revealDuration: 800,
                  hideDuration: 200,
                  revealFilter: "brightness(0.7) contrast(1.1)",
                  revealZIndex: 50,
                }}
              >
                <div className="relative z-10 py-10 px-8 flex items-center justify-between group">
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-baseline gap-6">
                      <span className="text-gray-600 text-sm font-mono">
                        0{(index ?? 0) + 1}
                      </span>
                      <div>
                        <h2
                          className={cn(
                            "text-5xl font-light text-white mb-2 transition-all duration-500 ease-out",
                            "hover:translate-x-2 translate-x-0",
                          )}
                        >
                          {project.title}
                        </h2>
                        <p
                          className={cn(
                            "text-gray-500 text-lg transition-all duration-500 ease-out",
                            "hover:translate-x-2 translate-x-0",
                          )}
                          style={{
                            transitionDelay: "50ms",
                          }}
                        >
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-white transition-all duration-500 ease-out">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>

                  {/* Accent line */}
                  <div
                    className={cn(
                      "absolute z-50 bottom-0 h-px bg-accent origin-left transition-transform duration-700 ease-out",
                      "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </div>
              </ReadialRevealItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// ALTERNATIVE EXAMPLE: Product Cards
// ============================================================================

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const ProductGrid: React.FC = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "Ceramic Vase",
      price: 89,
      category: "Home Decor",
      imageUrl: "/assets/product-images/palladio_profile.png",
    },
    {
      id: "2",
      name: "Linen Throw",
      price: 65,
      category: "Textiles",
      imageUrl: "/assets/product-images/corsica_profile.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
        {products.map((product) => (
          <ReadialRevealItem
            key={product.id}
            item={product}
            renderContent={(prod, isHovered) => (
              <div className="bg-white p-8 rounded-lg transition-shadow duration-300">
                <h3
                  className="text-2xl font-medium mb-2 transition-transform duration-300"
                  style={{
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {prod.name}
                </h3>
                <p className="text-gray-500 mb-4">{prod.category}</p>
                <p className="text-xl font-semibold">${prod.price}</p>
              </div>
            )}
            renderReveal={(prod) => (
              <>
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
            revealProps={{
              revealWidth: "w-64",
              revealHeight: "h-64",
              revealPosition: {
                top: "50%",
                left: "100%",
                transform: "translate(1rem, -50%)",
              },
              revealZIndex: 100,
              revealClassName: "rounded-lg shadow-2xl",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
