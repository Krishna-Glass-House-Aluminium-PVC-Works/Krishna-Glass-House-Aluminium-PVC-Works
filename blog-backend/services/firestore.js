/**
 * Krishna Glass House — Firestore Service
 * CRUD operations for blog posts stored in Firestore.
 */

import { Firestore } from '@google-cloud/firestore';

const COLLECTION = 'blog-posts';
let db = null;

function getDb() {
  if (!db) {
    db = new Firestore({
      projectId: process.env.GCP_PROJECT_ID,
    });
  }
  return db;
}

/**
 * Save a new blog post to Firestore
 */
export async function saveBlogPost(post) {
  const firestore = getDb();
  const docRef = firestore.collection(COLLECTION).doc(post.slug);

  const data = {
    slug: post.slug,
    title: post.title,
    metaDescription: post.metaDescription,
    content: post.content,           // HTML content
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags || [],
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    secondaryImageUrl: post.secondaryImageUrl || null,
    secondaryImageAlt: post.secondaryImageAlt || null,
    author: 'Krishna Glass House',
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: Firestore.FieldValue.serverTimestamp(),
  };

  await docRef.set(data);
  console.log(`✅ Blog post saved: ${post.slug}`);
  return data;
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug) {
  const firestore = getDb();
  const doc = await firestore.collection(COLLECTION).doc(slug).get();

  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

/**
 * Get all blog posts, ordered by publish date (newest first)
 */
export async function getAllPosts() {
  const firestore = getDb();
  const snapshot = await firestore
    .collection(COLLECTION)
    .orderBy('publishedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get recent posts with a limit
 */
export async function getRecentPosts(limit = 5) {
  const firestore = getDb();
  const snapshot = await firestore
    .collection(COLLECTION)
    .orderBy('publishedAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category) {
  const firestore = getDb();
  const snapshot = await firestore
    .collection(COLLECTION)
    .where('category', '==', category)
    .orderBy('publishedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Delete a blog post by slug
 */
export async function deleteBlogPost(slug) {
  const firestore = getDb();
  await firestore.collection(COLLECTION).doc(slug).delete();
  console.log(`🗑️ Blog post deleted: ${slug}`);
}

/**
 * Get total post count
 */
export async function getPostCount() {
  const firestore = getDb();
  const snapshot = await firestore.collection(COLLECTION).count().get();
  return snapshot.data().count;
}
