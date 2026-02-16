import { cn } from "@/lib/utils";
import { Shield, CheckCircle, Award, Lock } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 text-xs font-medium",
  {
    variants: {
      variant: {
        security: "text-emerald-600 dark:text-emerald-400",
        verified: "text-blue-600 dark:text-blue-400",
        award: "text-amber-600 dark:text-amber-400",
        privacy: "text-purple-600 dark:text-purple-400",
      },
    },
    defaultVariants: {
      variant: "verified",
    },
  },
);

const iconMap = {
  security: Shield,
  verified: CheckCircle,
  award: Award,
  privacy: Lock,
};

interface TrustBadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
  className?: string;
}

export function TrustBadge({ variant, label, className }: TrustBadgeProps) {
  const Icon = iconMap[variant || "verified"];
  return (
    <div className={cn(badgeVariants({ variant }), className)}>
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
