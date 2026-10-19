import Image from "next/image";

// Frame ko photo ki shape ke kareeb rakho (landscape), taake na bars aayen na zyada crop.
// Poori photo dekhni ho to zoom (lightbox) me object-contain hai.
export default function FitImage({
  src,
  alt = "",
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#f1ece6] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}