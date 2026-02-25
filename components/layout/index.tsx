"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  debug?: boolean;
}

const Layout = ({ children, debug = false }: LayoutProps) => {
  const pathname = usePathname();

  const isResourcesDashboard = pathname.startsWith("/ressurser-dashboard");
  const isTest = pathname.startsWith("/test");

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div
          className={cn(
            "flex flex-col w-full",
            isResourcesDashboard ? "h-screen" : "min-h-screen",
          )}
        >
          <Header debug={debug} sticky={!isResourcesDashboard} />
          <main
            className={cn(
              "flex-1",
              isResourcesDashboard && "min-h-0 overflow-hidden",
              debug && "border border-red-500! bg-red-500/20!",
            )}
          >
            {children}
          </main>
          <Footer debug={debug} compact={isResourcesDashboard || isTest} />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default Layout;
