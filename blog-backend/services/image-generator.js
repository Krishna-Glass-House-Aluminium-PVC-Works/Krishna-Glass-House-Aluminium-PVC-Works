/**
 * Krishna Glass House — Image Generator Service
 * Generates contextual image URLs using Unsplash for blog posts.
 * Falls back to curated high-quality images if the API is unavailable.
 */

// Curated Unsplash image collections mapped to blog categories
const CATEGORY_IMAGES = {
  'glass-work': [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop', alt: 'Modern glass facade on commercial building' },
    { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=630&fit=crop', alt: 'Glass office interior with natural light' },
    { url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=630&fit=crop', alt: 'Toughened glass railing on balcony' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop', alt: 'Contemporary glass building exterior' },
    { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=630&fit=crop', alt: 'Frameless glass shower enclosure' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop', alt: 'Modern home with glass features' },
  ],
  'aluminium-fabrication': [
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=630&fit=crop', alt: 'Aluminium window frames in modern building' },
    { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop', alt: 'Modern house with aluminium windows' },
    { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=630&fit=crop', alt: 'Aluminium sliding door in contemporary home' },
    { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=630&fit=crop', alt: 'Building exterior with aluminium cladding' },
    { url: 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=1200&h=630&fit=crop', alt: 'Aluminium facade detail on commercial structure' },
  ],
  'pvc-works': [
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop', alt: 'Modern interior with wall panels' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=630&fit=crop', alt: 'Stylish PVC wall panel living room' },
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop', alt: 'Interior design with modern wall treatments' },
    { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=630&fit=crop', alt: 'Contemporary bathroom with panel walls' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=630&fit=crop', alt: 'Luxury interior with PVC false ceiling' },
  ],
  'led-mirrors': [
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=630&fit=crop', alt: 'LED mirror in modern bathroom' },
    { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=630&fit=crop', alt: 'Designer bathroom vanity with LED lighting' },
    { url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&h=630&fit=crop', alt: 'Backlit LED mirror in luxury washroom' },
    { url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=630&fit=crop', alt: 'Modern LED mirror vanity setup' },
  ],
  'interior-design-trends': [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop', alt: 'Modern interior design trends' },
    { url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=630&fit=crop', alt: 'Contemporary living space design' },
    { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=630&fit=crop', alt: 'Minimalist interior with natural materials' },
    { url: 'https://images.unsplash.com/photo-1616137466211-f736a1e14a8d?w=1200&h=630&fit=crop', alt: 'Designer interior space with premium finishes' },
  ],
  'industry-technology': [
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop', alt: 'Modern construction technology' },
    { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=630&fit=crop', alt: 'Smart glass technology in architecture' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop', alt: 'Advanced building materials technology' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop', alt: 'Sustainable construction materials' },
  ],
};

/**
 * Get contextual images for a blog post based on its category
 * Returns { imageUrl, imageAlt, secondaryImageUrl, secondaryImageAlt }
 */
export function getContextualImages(category, imageAlt, secondaryImageAlt) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['glass-work'];

  // Shuffle and pick two different images
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  const primary = shuffled[0];
  const secondary = shuffled[1] || shuffled[0];

  return {
    imageUrl: primary.url,
    imageAlt: imageAlt || primary.alt,
    secondaryImageUrl: secondary.url,
    secondaryImageAlt: secondaryImageAlt || secondary.alt,
  };
}
