import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type CardVariant = "light" | "dark" | "blur";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: CardVariant;
  animated?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  light: "bg-bf-bg rounded-xl shadow-card",
  dark: "bg-bf-bg rounded-xl text-bf-text",
  blur: "bg-bf-bg/80 rounded-xl backdrop-blur-sm shadow-card",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "light", animated = true, className = "", children, ...props }, ref) => {
    const baseStyles = "overflow-hidden";
    const variantStyle = variantStyles[variant];
    const combinedClassName = `${baseStyles} ${variantStyle} ${className}`.trim();

    if (animated) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className={combinedClassName}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={combinedClassName}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
