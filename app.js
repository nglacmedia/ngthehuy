
const apiKey = "AIzaSyDkD3L-J3qMa0vnBA2TihZLFXZMgGpV9dc"; // demo key
const folderId = "1CQaqjHNEAN7gauoFhKB_Bv88NgwDOJM2";

const postsContainer = document.getElementById("posts");

async function fetchDriveFiles() {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  postsContainer.innerHTML = "";

  for (let file of data.files) {
    if (!file.name.endsWith(".txt") && !file.name.endsWith(".md")) continue;
    const content = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${apiKey}`).then(r => r.text());

    const postEl = document.createElement("div");
    postEl.className = "bg-white p-4 shadow rounded";
    postEl.innerHTML = `
      <h3 class="text-xl font-bold text-blue-700 mb-2">${file.name}</h3>
      <pre class="whitespace-pre-wrap text-gray-700">${content}</pre>
    `;
    postsContainer.appendChild(postEl);
  }
}

fetchDriveFiles();
