/**
 * GitHub REST API — GitOps push module
 * 
 * Handles reading/writing files in the GitHub repo using the Contents API.
 * No git binary required — pure HTTPS. Works in any containerized environment.
 * 
 * Required env vars:
 *   GITHUB_TOKEN  — Fine-grained PAT with Contents: Read & Write
 *   GITHUB_OWNER  — Repo owner (org or user)
 *   GITHUB_REPO   — Repo name
 *   GITHUB_BRANCH — Target branch (default: main)
 */

const GH_API = 'https://api.github.com';

function headers() {
  return {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'KGH-Blog-Engine/2.0',
  };
}

const OWNER  = () => process.env.GITHUB_OWNER  || 'Krishna-Glass-House-Aluminium-PVC-Works';
const REPO   = () => process.env.GITHUB_REPO   || 'Krishna-Glass-House-Aluminium-PVC-Works';
const BRANCH = () => process.env.GITHUB_BRANCH || 'main';

/**
 * Get a file's current content + SHA from GitHub.
 * Returns { content: string (utf-8), sha: string } or null if not found.
 */
export async function getFile(path) {
  const url = `${GH_API}/repos/${OWNER()}/${REPO()}/contents/${path}?ref=${BRANCH()}`;
  const res = await fetch(url, { headers: headers() });

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub getFile(${path}) → ${res.status}: ${body}`);
  }

  const data = await res.json();
  // GitHub returns base64-encoded content with possible newlines
  const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

/**
 * Create or update a file in the GitHub repo.
 * @param {string} path       - Repo-relative path (e.g. 'blogs/my-post.html')
 * @param {string} content    - UTF-8 file content
 * @param {string} message    - Commit message
 * @param {string|null} sha   - Existing file SHA (required for updates, null for creates)
 */
export async function putFile(path, content, message, sha = null) {
  const url = `${GH_API}/repos/${OWNER()}/${REPO()}/contents/${path}`;
  const encoded = Buffer.from(content, 'utf-8').toString('base64');

  const body = {
    message,
    content: encoded,
    branch: BRANCH(),
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub putFile(${path}) → ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  console.log(`✅ GitHub: committed "${path}" (${data.commit?.sha?.slice(0, 7)})`);
  return data;
}

/**
 * Commit multiple files in one batch using the Trees + Commits API.
 * This is more efficient and results in a single commit for all changes.
 *
 * @param {Array<{path: string, content: string}>} files
 * @param {string} message - Commit message
 */
export async function commitMultiple(files, message) {
  const base = `${GH_API}/repos/${OWNER()}/${REPO()}`;

  // 1. Get current HEAD commit SHA
  const refRes = await fetch(`${base}/git/ref/heads/${BRANCH()}`, { headers: headers() });
  if (!refRes.ok) throw new Error(`GitHub ref fetch failed: ${await refRes.text()}`);
  const refData = await refRes.json();
  const headSha = refData.object.sha;

  // 2. Get the tree SHA of HEAD
  const commitRes = await fetch(`${base}/git/commits/${headSha}`, { headers: headers() });
  const commitData = await commitRes.json();
  const baseTreeSha = commitData.tree.sha;

  // 3. Create new blobs for each file
  const treeItems = await Promise.all(files.map(async ({ path, content }) => {
    const blobRes = await fetch(`${base}/git/blobs`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        content: Buffer.from(content, 'utf-8').toString('base64'),
        encoding: 'base64',
      }),
    });
    if (!blobRes.ok) throw new Error(`Blob creation failed for ${path}: ${await blobRes.text()}`);
    const blob = await blobRes.json();
    return { path, mode: '100644', type: 'blob', sha: blob.sha };
  }));

  // 4. Create a new tree
  const treeRes = await fetch(`${base}/git/trees`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  });
  if (!treeRes.ok) throw new Error(`Tree creation failed: ${await treeRes.text()}`);
  const newTree = await treeRes.json();

  // 5. Create the commit
  const newCommitRes = await fetch(`${base}/git/commits`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      message,
      tree: newTree.sha,
      parents: [headSha],
    }),
  });
  if (!newCommitRes.ok) throw new Error(`Commit creation failed: ${await newCommitRes.text()}`);
  const newCommit = await newCommitRes.json();

  // 6. Update the branch ref to the new commit
  const updateRes = await fetch(`${base}/git/refs/heads/${BRANCH()}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ sha: newCommit.sha }),
  });
  if (!updateRes.ok) throw new Error(`Ref update failed: ${await updateRes.text()}`);

  console.log(`✅ GitHub: batch commit ${newCommit.sha.slice(0, 7)} — "${message}" (${files.length} files)`);
  return { commitSha: newCommit.sha };
}
