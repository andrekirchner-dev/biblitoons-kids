interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  eager?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  style?: React.CSSProperties;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  eager = false,
  objectFit = "cover",
  style,
}: OptimizedImageProps) => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const avifSrc = src.replace(/\.(png|jpg|jpeg)$/i, ".avif");

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrc} />
      <source type="image/webp" srcSet={webpSrc} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ objectFit, maxWidth: "100%", ...style }}
      />
    </picture>
  );
};

export default OptimizedImage;
