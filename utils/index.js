export function getTitleImage(featuredMedia, size) {
  if (!featuredMedia) return;
  const sizes = featuredMedia[0].media_details.sizes;
  if (size in sizes) {
    return sizes[size].source_url;
  }
  return sizes.full.source_url;
}
