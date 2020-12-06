export function getTitleImage(featuredMedia, size) {
  if (!featuredMedia || !featuredMedia[0].media_details) return;
  const sizes = featuredMedia[0].media_details.sizes;
  if (size in sizes) {
    return sizes[size].source_url;
  }
  return sizes.full.source_url;
}

export function parsePost(post) {
  return {
    id: post.id,
    date: post.date,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    image: post._embedded["wp:featuredmedia"]
      ? {
          link: getTitleImage(post._embedded["wp:featuredmedia"], "medium"),
          alt: post._embedded["wp:featuredmedia"][0].alt_text,
        }
      : undefined,
    category: {
      id: post._embedded["wp:term"][0][0].id,
      slug: post._embedded["wp:term"][0][0].slug,
    },
  };
}

export function parsePostFull(post) {
  return {
    id: post.id,
    date: post.date,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    image: post._embedded["wp:featuredmedia"]
      ? {
          link: getTitleImage(post._embedded["wp:featuredmedia"], "full"),
          alt: post._embedded["wp:featuredmedia"][0].alt_text,
        }
      : undefined,
    category: {
      id: post._embedded["wp:term"][0][0].id,
      slug: post._embedded["wp:term"][0][0].slug,
    },
  };
}

export function parsePostArticle(post) {
  return {
    id: post.id,
    date: post.date,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    image: post._embedded["wp:featuredmedia"]
      ? {
          link: getTitleImage(post._embedded["wp:featuredmedia"], "full"),
          alt: post._embedded["wp:featuredmedia"][0].alt_text,
        }
      : undefined,
    author: post._embedded.author[0].name,
    categories: post._embedded["wp:term"][0].map((category) => ({
      id: category.id,
      slug: category.slug,
    })),
    tags: post._embedded["wp:term"][1].map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    comment_status: post.comment_status,
    meta: {
      title: post.acf.meta_title,
      description: post.acf.meta_description,
      keywords: post.acf.meta_keywords,
    },
  };
}
