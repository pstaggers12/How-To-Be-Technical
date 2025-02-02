function showContent(id) {
    document.querySelectorAll('.content').forEach(div => div.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
function addComment() {
    let commentBox = document.getElementById('commentBox'); // Ensure this exists
    let commentText = commentBox.value.trim();
    if (commentText.length > 0) {
        let commentList = document.getElementById('commentsList');
        let newComment = document.createElement('li');
        newComment.innerHTML = `${commentText} <button onclick='likeComment(this)'>❤️ <span>0</span></button>`;
        commentList.appendChild(newComment);
        saveComment(commentText);
        commentBox.value = '';
        document.getElementById('wordCount').textContent = '0/250';
    }
}

function likeComment(button) {
    let countSpan = button.querySelector('span');
    let count = parseInt(countSpan.innerText);
    countSpan.innerText = count + 1;
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    loadComments();
});

// Function to add a comment
function addComment() {
    let commentBox = document.getElementById('commentBox');
    let commentText = commentBox.value.trim();
    
    if (commentText.length > 0) {
        let commentsList = document.getElementById('commentsList');
        // Create a new comment element
        let newComment = document.createElement('li');
        newComment.innerHTML = `${commentText} 
            <button onclick='likeComment(this)'>❤️ <span>0</span></button>`;
        commentList.appendChild(newComment);
        saveComment(commentText);
        commentBox.value = '';
        document.getElementById('wordCount').textContent = '0/250';
    }
}

document.getElementById('commentBox').addEventListener('input', function() {
    let count = this.value.length;
    document.getElementById('wordCount').textContent = `${count}/250`;
    if (count > 250) {
        this.value = this.value.substring(0, 250);
    }
});

window.addEventListener('scroll', function() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// Function to like a comment
function likeComment(button) {
    let countSpan = button.querySelector('span');
    let count = parseInt(countSpan.innerText);
    countSpan.innerText = count + 1;
    // Update localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let commentIndex = [...button.parentElement.parentElement.children].indexOf(button.parentElement);
    if (comments[commentIndex]) {
        comments[commentIndex].likes += 1;
        localStorage.setItem('comments', JSON.stringify(comments));
    }
}

// Function to save comments in localStorage
function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ text: comment, likes: 0 });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to load comments from localStorage
function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let commentsList = document.getElementById('commentsList');
    
    comments.forEach(comment => {
        let newComment = document.createElement('li');
        newComment.innerHTML = `${comment.text} 
            <button onclick='likeComment(this)'>❤️ <span>${comment.likes}</span></button>`;
        
        commentsList.appendChild(newComment);
    });
}

function searchContent() {
    let query = document.getElementById('searchBox').value.toLowerCase();
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = section.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}
