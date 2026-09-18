import React from 'react';
import media from '../data/media.json';
import { asset } from '../data/content';

export default function ArchitectureImage({ src, sizes = '(max-width: 650px) 100vw, 80vw', loading = 'lazy', ...props }) {
  const file = src.split('/').pop();
  const record = media[file];
  return <img src={src} srcSet={record?.widths.map(width => `${asset(`responsive/${file.replace('.jpg', '')}-${width}.webp`)} ${width}w`).join(', ')} sizes={sizes} width={record?.width} height={record?.height} loading={loading} decoding="async" {...props} />;
}
