import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "./Button";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid children items */
  children: React.ReactNode;
  /** Gap between bento grid items (defaults to gap-6) */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Whether to automatically apply asymmetric spans (first and last span 2 cols on desktop) */
  autoAsymmetricSpans?: boolean;
}

const gapSizes = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-6 sm:gap-8",
  xl: "gap-8 sm:gap-10",
};

export interface BentoCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Card Title */
  title: React.ReactNode;
  /** Optional Gujarati title or tagline */
  titleGu?: string;
  /** Card Description */
  description: React.ReactNode;
  /** Visual header slot (image, graphic, stats, or illustration) */
  header?: React.ReactNode;
  /** Icon badge */
  icon?: React.ReactNode;
  /** Top badge text */
  badge?: string;
  /** Stat badge text */
  stat?: string;
  /** CTA Button text */
  ctaText?: string;
  /** CTA Link */
  ctaHref?: string;
  /** Entire card link */
  href?: string;
  /** Desktop column span override (1, 2, or 3) */
  colSpan?: 1 | 2 | 3;
  /** Row span (1 or 2) */
  rowSpan?: 1 | 2;
}

/**
 * BentoCard: An individual asymmetric tile suited for BentoGrid layouts.
 */
export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  titleGu,
  description,
  header,
  icon,
  badge,
  stat,
  ctaText,
  ctaHref,
  href,
  colSpan,
  rowSpan,
  className,
  children,
  ...props
}) => {
  const colSpanClasses = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
  };

  const rowSpanClasses = {
    1: "row-span-1",
    2: "row-span-2",
  };

  const badgeText = stat || badge;

  const innerContent = (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-forest-50 p-6 border-2 border-transparent shadow-sm",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-saffron",
        colSpan && colSpanClasses[colSpan],
        rowSpan && rowSpanClasses[rowSpan],
        href && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Visual Header / Media */}
      {header && (
        <div className="relative w-full rounded-xl overflow-hidden mb-5 min-h-[160px] bg-white/60 flex items-center justify-center">
          {header}
        </div>
      )}

      {/* Badges / Category row */}
      {(badgeText || icon) && (
        <div className="flex items-center justify-between mb-4 gap-2">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm text-forest flex items-center justify-center text-2xl border border-forest-100 shrink-0 group-hover:scale-105 transition-transform duration-300">
              {icon}
            </div>
          )}
          {badgeText && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-forest border border-forest-200 shadow-xs">
              {badgeText}
            </span>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {titleGu && (
          <span className="font-gujarati text-saffron text-xs sm:text-sm font-semibold mb-1 block">
            {titleGu}
          </span>
        )}

        <h3 className="font-heading font-bold text-xl sm:text-2xl text-forest group-hover:text-forest-light transition-colors mb-2">
          {title}
        </h3>

        <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed flex-1">
          {description}
        </p>

        {children}
      </div>

      {/* Optional CTA */}
      {ctaText && (
        <div className="mt-5 pt-4 border-t border-forest/5 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            href={ctaHref}
            className="p-0 text-saffron hover:text-saffron-dark hover:bg-transparent"
            rightIcon={
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            }
          >
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );

  if (href && !ctaHref) {
    return (
      <Link href={href} className="block no-underline h-full">
        {innerContent}
      </Link>
    );
  }

  return innerContent;
};

/**
 * BentoGrid: Responsive asymmetric layout component.
 * - 1 column on mobile
 * - 2 columns on tablet
 * - 3 columns on desktop
 * - First and last items automatically span 2 columns on desktop
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  gap = "md",
  autoAsymmetricSpans = true,
  className,
  ...props
}) => {
  const childArray = React.Children.toArray(children);
  const totalCount = childArray.length;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr",
        gapSizes[gap],
        className
      )}
      {...props}
    >
      {childArray.map((child, index) => {
        if (!autoAsymmetricSpans || totalCount <= 1) {
          return child;
        }

        const isFirst = index === 0;
        const isLast = index === totalCount - 1;
        const shouldSpan2 = isFirst || isLast;

        if (React.isValidElement(child)) {
          // If child already explicitly declares colSpan, let it take precedence
          if (child.props?.colSpan) {
            return child;
          }

          // Otherwise inject responsive span styling
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(
              shouldSpan2 ? "lg:col-span-2" : "lg:col-span-1",
              child.props.className
            ),
          });
        }

        return (
          <div
            key={index}
            className={shouldSpan2 ? "lg:col-span-2" : "lg:col-span-1"}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export const BentoGridItem = BentoCard;
export type BentoGridItemProps = BentoCardProps;

export default BentoGrid;
