import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Optional link destination. When provided, renders Next.js Link or anchor */
  href?: string;
  /** Open link in new tab (applicable when href is present) */
  external?: boolean;
  /** Show loading spinner and disable interaction */
  isLoading?: boolean;
  /** Text to show during loading state (optional) */
  loadingText?: string;
  /** Icon to display before the text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the text */
  rightIcon?: React.ReactNode;
  /** Make button stretch full width of container */
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-saffron text-white shadow-sm hover:bg-saffron-dark active:bg-saffron-600 focus-visible:ring-saffron",
  secondary:
    "bg-forest text-white shadow-sm hover:bg-forest-light active:bg-forest-dark focus-visible:ring-forest",
  outline:
    "border-2 border-forest text-forest bg-transparent hover:bg-forest hover:text-white active:bg-forest-dark focus-visible:ring-forest",
  ghost:
    "text-forest bg-transparent hover:bg-forest/10 active:bg-forest/20 focus-visible:ring-forest",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs sm:text-sm px-3.5 py-1.5 rounded-lg gap-1.5 font-medium",
  md: "text-sm sm:text-base px-5 py-2.5 rounded-xl gap-2 font-semibold",
  lg: "text-base sm:text-lg px-7 py-3.5 rounded-xl gap-2.5 font-bold tracking-wide",
};

/**
 * Accessible SVG Loading Spinner
 */
const ButtonSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin h-4 w-4 shrink-0", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Reusable Button component supporting multiple variants, sizes, link modes, and loading states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseStyles = cn(
      "inline-flex items-center justify-center font-heading select-none cursor-pointer",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "active:scale-[0.98]",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      isDisabled &&
        "opacity-60 cursor-not-allowed pointer-events-none active:scale-100 shadow-none",
      className
    );

    const content = (
      <>
        {isLoading ? (
          <>
            <ButtonSpinner className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 inline-flex" aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0 inline-flex" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </>
    );

    // If href is specified, render Next.js Link or external anchor
    if (href && !isDisabled) {
      if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
          <a
            href={href}
            className={baseStyles}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-disabled={isDisabled}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={baseStyles} aria-disabled={isDisabled}>
          {content}
        </Link>
      );
    }

    // When disabled and href was provided, render a disabled anchor lookalike
    if (href && isDisabled) {
      return (
        <span
          className={baseStyles}
          role="link"
          aria-disabled="true"
          tabIndex={-1}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={baseStyles}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
