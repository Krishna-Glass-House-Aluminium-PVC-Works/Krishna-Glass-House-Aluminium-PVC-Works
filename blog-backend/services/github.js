const axios = require('axios');

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || 'mitanshubhasin';
const REPO = process.env.GITHUB_REPO || 'Krishna-Glass-House-Aluminium-PVC-Works';
const BRANCH = process.env.GITHUB_BRANCH || 'main'; // Cloudflare Pages branch

const api = axios.create({
  baseURL: `https://api.github.com/repos/${OWNER}/${REPO}`,
  headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json' }
});

const getFile = async (path) => {
  try {
    const { data } = await api.get(`/contents/${path}?ref=${BRANCH}`);
    return { content: Buffer.from(data.content, 'base64').toString('utf-8'), sha: data.sha };
  } catch (err) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

const commitMultiple = async (files, message) => {
  console.log(`🚀 Committing ${files.length} files to ${OWNER}/${REPO}...`);
  
  // Step 1: Get latest commit SHA
  const { data: refData } = await api.get(`/git/ref/heads/${BRANCH}`);
  const latestCommitSha = refData.object.sha;

  // Step 2: Get the tree of that commit
  const { data: commitData } = await api.get(`/git/commits/${latestCommitSha}`);
  const baseTreeSha = commitData.tree.sha;

  // Step 3: Create Blobs & Tree Entries
  const treeEntries = files.map(f => ({
    path: f.path,
    mode: '100644',
    type: 'blob',
    content: f.content
  }));

  // Step 4: Create a new Tree
  const { data: newTree } = await api.post('/git/trees', {
    base_tree: baseTreeSha,
    tree: treeEntries
  });

  // Step 5: Create the Commit
  const { data: newCommit } = await api.post('/git/commits', {
    message,
    tree: newTree.sha,
    parents: [latestCommitSha]
  });

  // Step 6: Update Ref
  const { data: updatedRef } = await api.patch(`/git/refs/heads/${BRANCH}`, {
    sha: newCommit.sha,
    force: false
  });

  return updatedRef.object;
};

module.exports = { getFile, commitMultiple };
