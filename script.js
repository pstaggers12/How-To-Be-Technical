document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    loadComments();
});

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Show specific content section
function showContent(id) {
    document.querySelectorAll('.content').forEach(div => div.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Add a comment
function addComment() {
    let commentBox = document.getElementById('commentBox');
    let commentsList = document.getElementById('commentsList');

    if (!commentBox || !commentsList) return; // Prevents undefined issues

    let commentText = commentBox.value.trim();
    
    if (commentText.length > 0) {
        let newComment = document.createElement('li');
        newComment.innerHTML = `${commentText} 
            <button onclick='likeComment(this)'>❤️ <span>0</span></button>`;
        commentsList.appendChild(newComment);

        saveComment(commentText);
        commentBox.value = '';
        document.getElementById('wordCount').textContent = '0/250';
    }
}

// Like a comment
function likeComment(button) {
    let countSpan = button.querySelector('span');
    let count = parseInt(countSpan.innerText);
    countSpan.innerText = count + 1;

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let commentIndex = [...button.parentElement.parentElement.children].indexOf(button.parentElement);

    if (comments[commentIndex]) {
        comments[commentIndex].likes += 1;
        localStorage.setItem('comments', JSON.stringify(comments));
    }
}

// Save comments in localStorage
function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ text: comment, likes: 0 });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Load comments from localStorage
function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let commentsList = document.getElementById('commentsList');

    if (!commentsList) return; // Prevents undefined errors

    commentsList.innerHTML = ''; // Clears any previous undefined placeholders

    comments.forEach(comment => {
        let newComment = document.createElement('li');
        newComment.innerHTML = `${comment.text} 
            <button onclick='likeComment(this)'>❤️ <span>${comment.likes}</span></button>`;
        commentsList.appendChild(newComment);
    });
}

// Word count for comment input
document.getElementById('commentBox')?.addEventListener('input', function() {
    let count = this.value.length;
    document.getElementById('wordCount').textContent = `${count}/250`;

    if (count > 250) {
        this.value = this.value.substring(0, 250);
    }
});

// Track scroll progress
window.addEventListener('scroll', function() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// Search content
function searchContent() {
    let query = document.getElementById('searchBox').value.toLowerCase();
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = section.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}
