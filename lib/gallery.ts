import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const GALLERY_DIR = path.join(process.cwd(), "public", "graeme-gallery");
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

export type GalleryPhoto = { src: string; width: number; height: number };

/** Every image in public/graeme-gallery, in filename order, with its upright dimensions. */
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return Promise.all(
    files.map(async (file) => {
      const { width, height, autoOrient } = await sharp(path.join(GALLERY_DIR, file)).metadata();
      return {
        src: `/graeme-gallery/${encodeURIComponent(file)}`,
        width: autoOrient?.width ?? width,
        height: autoOrient?.height ?? height,
      };
    }),
  );
}
