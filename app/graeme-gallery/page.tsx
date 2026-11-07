import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/page-title";
import { getGalleryPhotos, type GalleryPhoto } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "graeme gallery",
  description: "Photos of Graeme, Jordan Kusuda's pug.",
};

/** Places each photo in whichever column is shortest so far, so the columns stay even. */
function intoColumns(photos: GalleryPhoto[]) {
  const columns: GalleryPhoto[][] = [[], []];
  const heights = [0, 0];

  for (const photo of photos) {
    const shortest = heights[0] <= heights[1] ? 0 : 1;
    columns[shortest].push(photo);
    heights[shortest] += photo.height / photo.width;
  }
  return columns;
}

export default async function GraemeGallery() {
  const photos = await getGalleryPhotos();

  return (
    <div className="max-w-3xl">
      <PageTitle>Graeme Gallery</PageTitle>
      <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 sm:gap-8">
        {intoColumns(photos).map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6 sm:gap-8">
            {column.map(({ src, width, height }) => (
              <div
                key={src}
                className="group overflow-hidden rounded-md transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1"
              >
                <Image
                  src={src}
                  alt="Graeme the pug"
                  width={width}
                  height={height}
                  sizes="(min-width: 640px) 368px, 100vw"
                  className="h-auto w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
