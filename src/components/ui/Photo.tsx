import Image from "next/image";
import { photos, type PhotoKey } from "@/content/images";

type Props = {
  photo: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function Photo({ photo, className, sizes = "100vw", priority, fill, width, height }: Props) {
  const p = photos[photo];
  return fill ? (
    <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className={className} />
  ) : (
    <Image src={p.src} alt={p.alt} width={width ?? 1600} height={height ?? 1067} sizes={sizes} priority={priority} className={className} />
  );
}
