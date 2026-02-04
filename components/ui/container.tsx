import { cn } from "@/lib/utils";

interface ContainerProps<T extends React.ElementType> {
  /** The HTML element to render the container as */
  as?: T;
  /** Content to be rendered inside */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** If true, the container will ignore max-width and take full width */
  fluid?: boolean;

  debug?: boolean;

  ref?: React.RefObject<HTMLDivElement | null>;
}

/**
 * A highly reusable, typesafe Container component.
 * Centers content and applies responsive horizontal padding.
 */
export const Container = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  fluid = false,
  debug = false,
  ref,
  ...props
}: ContainerProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as || "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        !fluid &&
          "w-full max-w-5xl md:max-w-screen-3xl lg:max-w-screen-5xl xl:max-w-screen-7xl 2xl:max-w-screen-2xl",
        fluid && "w-full",
        debug && "border-2 border-red-500",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
