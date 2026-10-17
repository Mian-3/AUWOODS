import Image from "next/image";

// Logo mark (public/brand). "white" variant hero jaisi dark images ke upar.
export default function Logo({
  variant = "color",
  className = "h-9",
  priority = false,
  alt = "",
}) {
  const src = variant === "white" ? "/brand/logo-white.png" : "/brand/logo.png";

  return (
    <Image
      src={src}
      alt={alt}
      width={634}
      height={709}
      priority={priority}
      className={`w-auto shrink-0 ${className}`}
    />
  );
}