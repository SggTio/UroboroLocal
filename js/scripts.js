const displayRecientesByTag = (sectionId, tag) => {
    const recientesSection = document.getElementById(sectionId);

    // Fetch and filter posts
    fetch('posts')
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const postLinks = doc.querySelectorAll('a');

            const filteredPosts = Array.from(postLinks)
                .map((link) => link.href)
                .filter((url) => url.includes(-${tag}.html))
                .sort((urlA, urlB) => {
                    const dateA = new Date(getPostDate(urlA));
                    const dateB = new Date(getPostDate(urlB));
                    return dateB - dateA;
                });

            // Display filtered posts
            filteredPosts.forEach((url) => {
                const postContainer = document.createElement('div');
                postContainer.classList.add('post-container');
                postContainer.innerHTML = `
                    <h3><a href="${url}">${getPostTitle(url)}</a></h3>
                    <p>${getPostDate(url)}</p>
                `;
                recientesSection.appendChild(postContainer);
            });
        });
};

// Function to extract post title from URL
const getPostTitle = (url) => {
    const filename = url.split('/').pop();
    return filename.split('-').slice(3).join('-').replace('.html', '');
};

// Function to extract post date from URL
const getPostDate = (url) => {
    const filename = url.split('/').pop();
    return filename.split('-').slice(0, 3).join('-');
};
