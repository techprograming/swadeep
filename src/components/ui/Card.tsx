import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button, { ButtonVariant } from "./Button";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Card title */
  title?: React.ReactNode;
  /** Optional Gujarati title or sub-text */
  titleGu?: string;
  /** Card body description */
  description?: React.ReactNode;
  /** Source URL for image. If omitted, an accessible placeholder div is displayed */
  imageSrc?: string;
  /** Image alternative text for accessibility */
  imageAlt?: string;
  /** Aspect ratio for image or placeholder */
  imageAspectRatio?: "video" | "square" | "tall" | "wide";
  /** Custom media slot replacing or complementing imageSrc */
  imageSlot?: React.ReactNode;
  /** Floating badge or tag overlay on image */
  badge?: string;
  /** Icon shown in card header */
  icon?: React.ReactNode;
  /** Optional CTA label */
  ctaText?: string;
  /** Optional CTA destination link */
  ctaHref?: string;
  /** Variant style for the CTA button */
  ctaVariant?: ButtonVariant;
  /** External link indicator for CTA */
  ctaExternal?: boolean;
  /** Entire card clickable link destination (if wrapping whole card) */
  href?: string;
  /** Whether to enable hover lift and elevation effect (defaults to true) */
  hoverEffect?: boolean;
  /** Custom footer node */
  footer?: React.ReactNode;
}

const aspectRatios = {
  video: "aspect-[16/9]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  wide: "aspect-[21/9]",
};

/**
 * Placeholder SVG illustration for cards without loaded images
 */
const CardImagePlaceholder = () => (
  <div
    className="w-full h-full flex flex-col items-center justify-center bg-forest-50/70 text-forest/40 p-6 select-none"
    aria-hidden="true"
  >
    <svg
      className="w-12 h-12 mb-2 stroke-forest/30"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
    <span className="text-xs font-medium text-forest/50 tracking-wider uppercase">
      Swadeep Foundation
    </span>
  </div>
);

/**
 * Versatile Card Component:
 * Features image/placeholder div, badge, title, description, optional CTA,
 * rounded corners, and a smooth hover lift effect with shadow.
 */
export const Card: React.FC<CardProps> = ({
  title,
  titleGu,
  description,
  imageSrc,
  imageAlt = "Card image",
  imageAspectRatio = "video",
  imageSlot,
  badge,
  icon,
  ctaText,
  ctaHref,
  ctaVariant = "primary",
  ctaExternal = false,
  href,
  hoverEffect = true,
  footer,
  className,
  children,
  ...props
}) => {
  const cardContent = (
    <div
      className={cn(
        "group relative flex flex-col h-full bg-cream-dark rounded-2xl overflow-hidden",
        "border border-forest/5 shadow-md",
        hoverEffect &&
          "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-forest/15",
        href && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Card Media Area (Image or Placeholder) */}
      {(imageSrc || imageSlot || badge || imageAspectRatio) && (
        <div
          className={cn(
            "relative w-full overflow-hidden bg-forest-50/50 shrink-0",
            aspectRatios[imageAspectRatio]
          )}
        >
          {imageSlot ? (
            imageSlot
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <CardImagePlaceholder />
          )}

          {/* Floating Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-forest shadow-sm backdrop-blur-sm border border-forest/10">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Icon Header */}
        {icon && (
          <div className="mb-3 text-saffron inline-flex items-center justify-center w-10 h-10 rounded-xl bg-saffron-50 text-xl border border-saffron-100">
            {icon}
          </div>
        )}

        {/* Gujarati Subtitle/Tag */}
        {titleGu && (
          <span className="font-gujarati text-saffron text-xs sm:text-sm font-semibold mb-1 block">
            {titleGu}
          </span>
        )}

        {/* Title */}
        {title && (
          <h3 className="font-heading font-bold text-lg sm:text-xl text-forest group-hover:text-forest-light transition-colors duration-200 line-clamp-2 mb-2">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 flex-1">
            {description}
          </p>
        )}

        {/* Custom Children */}
        {children && <div className="flex-1 mb-4">{children}</div>}

        {/* Card Action / Footer */}
        {(ctaText || footer) && (
          <div className="mt-auto pt-3 border-t border-forest/5 flex items-center justify-between gap-3">
            {ctaText && (
              <Button
                variant={ctaVariant}
                size="sm"
                href={ctaHref}
                external={ctaExternal}
                rightIcon={
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
            )}

            {footer && <div className="w-full">{footer}</div>}
          </div>
        )}
      </div>
    </div>
  );

  // If entire card is meant to link somewhere
  if (href && !ctaHref) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl"
        >
          {cardContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default Card;
