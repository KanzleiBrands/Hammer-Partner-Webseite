import NextImage, { type ImageProps } from "next/image";
import { focus } from "@/lib/faces";

/**
 * next/image mit automatischem Bildausschnitt: richtet object-position auf die
 * Gesichter im Foto aus (siehe lib/faces.ts), damit Köpfe nie abgeschnitten werden.
 */
export default function Image(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const style = { objectPosition: focus(src), ...props.style };
  return <NextImage {...props} style={style} />;
}
