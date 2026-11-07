"use client";

import Image from "next/image";
import { useRef } from "react";
import { PopupDialog } from "@/components/popup-dialog";
import { TextLink } from "@/components/text-link";
import { Tooltip } from "@/components/tooltip";

type PhotoProps = {
  thumbnail: string;
  thumbnailClassName: string;
  /** Pixel size the thumbnail file is requested at. */
  thumbnailSize: number;
  full: string;
  alt: string;
  openLabel: string;
  tooltip?: string;
  caption: React.ReactNode;
};

function PhotoWithPopup({
  thumbnail,
  thumbnailClassName,
  thumbnailSize,
  full,
  alt,
  openLabel,
  tooltip,
  caption,
}: Readonly<PhotoProps>) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="group relative">
        <button
          type="button"
          data-intro-photo
          aria-haspopup="dialog"
          aria-label={openLabel}
          onClick={() => dialog.current?.showModal()}
          className="block cursor-pointer rounded-full transition-transform duration-200 ease-out motion-safe:hover:scale-105"
        >
          <Image
            src={thumbnail}
            alt=""
            width={thumbnailSize}
            height={thumbnailSize}
            preload
            className={`rounded-full object-cover ${thumbnailClassName}`}
          />
        </button>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>

      <PopupDialog ref={dialog} aria-label={alt} className="w-[min(90vw,26rem)] overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={full}
            alt={alt}
            fill
            sizes="(min-width: 480px) 416px, 90vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute top-3 right-3 cursor-pointer rounded-full bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            Close ×
          </button>
        </div>
        <p className="px-5 py-4 text-center text-sm leading-relaxed text-muted-foreground">
          {caption}
        </p>
      </PopupDialog>
    </>
  );
}

export function AboutPhotos() {
  return (
    <div className="mb-7 flex items-center gap-3">
      <PhotoWithPopup
        thumbnail="/avatar.jpg"
        thumbnailClassName="size-24 md:size-28"
        thumbnailSize={224}
        full="/avatar.jpg"
        alt="Jordan Kusuda"
        openLabel="Open Jordan's headshot"
        caption={
          <>
            This is my headshot! If you like what you see, let’s connect on{" "}
            <TextLink href="https://www.linkedin.com/in/jordankusuda/">LinkedIn</TextLink>.
          </>
        }
      />
      <span
        data-intro-target="ampersand"
        aria-hidden
        className="text-3xl font-light text-muted-foreground"
      >
        &amp;
      </span>
      <PhotoWithPopup
        thumbnail="/graeme.jpg"
        thumbnailClassName="size-14 md:size-16"
        thumbnailSize={128}
        full="/graeme-large.jpg"
        alt="Graeme, Jordan's pug"
        openLabel="Open a photo of Graeme, pronounced like graham cracker"
        tooltip="Graeme, like graham cracker"
        caption={
          <>
            This is my dog, Graeme! If you think he’s cute,{" "}
            <TextLink href="/contact">let’s connect</TextLink> or see more of him in the{" "}
            <TextLink href="/graeme-gallery">Graeme Gallery</TextLink>.
          </>
        }
      />
    </div>
  );
}
