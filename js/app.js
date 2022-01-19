// app js 

// selectors 
const blogContent = document.querySelector(".blogs-content"),
    commentsContent = document.querySelector(".comments"),
    singlePostContent = document.querySelector(".single-post-content"),
    postDetails = document.querySelector(".post-details"),
    userContent = document.querySelector(".users-content"),
    bloggerContent = document.querySelector(".bloggers-blog"),
    postTitle = document.querySelector(".single-post-title");


// function for shown up post in post pages 

function ShownPost() {
    // fetch users 
    fetch(`https://jsonplaceholder.typicode.com/posts`).then(posts => posts.json()).then(post => {
        for (var i = 0; i < 25; i++) {
            let Tags = `<div class="blog">
                         <img src="https://via.placeholder.com/600/b0f7cc" alt="blogs-image">
                         <div class="details">
                             <h3 class="title">${post[i].title.substr(0, 40)}</h3>
                             <p class="text">${post[i].body.substr(0, 70)}</p>
                             <a href="#" data-id="${post[i].id}" class="readmore" onclick = "btns(this)">Read more</a>
                         </div>
                     </div>`;
            blogContent.innerHTML += Tags;
        }
    })
};
ShownPost();

// function for shown up single post in single post pages 
const postContent = document.querySelector(".post-content");

function btns(target) {
    blogContent.classList.add("none-grid");
    var getId = target.getAttribute('data-id');
    if (getId) {
        // show single post pages 
        blogContent.classList.add("active");
        blogContent.querySelectorAll(".blog").forEach(btn => btn.classList.add("remove"));
        fetch(`https://jsonplaceholder.typicode.com/posts/${getId}`).then(res => res.json()).then(data => {

            let PostTags = ` <img width="500" src="https://via.placeholder.com/600/b0f7cc" alt="blogs-image">
                            <h3 class="title">${data.title}</h3>
                            <p class="single-post-desc">${data.body} post id ${data.id}</p>`;

            document.querySelector(".post-details").innerHTML = PostTags;
            fetch(`https://jsonplaceholder.typicode.com/comments`).then(comm => comm.json()).then(comments => {
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].postId === data.id) {
                        let tags = `<div class="comment"> 
                                <div class="comment-header">
                                    <div class="avatar">${comments[i].email.split('')[0]}</div>
                                    <div class="username">${comments[i].email}</div>
                                </div>
                                <div class="comment-body">
                                    <strong class="title">${comments[i].name}</strong>
                                    <p class="text">${comments[i].body}</p>
                                </div>
                            </div>`;
                        document.querySelector(".comments").innerHTML += tags;
                    }
                }
            })
        })

        // show images in post 
    }

}


// Show Users in User.html pages 
function shownUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`).then(users => users.json()).then(user => {
        for (let i = 0; i < user.length; i++) {
            const element = user[i];
            document.querySelector(".badge").textContent = user.length;
            let tags = `<div class="user" onclick ="bloggers(${element.id})">
                                <div class="user-avatar">${element.name.split("")[0]}</div>
                                <div class="user-name">
                                    <span class="name">${element.name}</span>
                                    <small class="email">${element.email}</small>
                                </div>
                            </div>`;
            userContent.innerHTML += tags;
        }
    })

};
shownUsers();


// show single users profile 

function bloggers(data) {
    if (data) {
        userContent.style.display = 'none';
        bloggerContent.style.display = 'grid';
        // code for show title 
        fetch(`https://jsonplaceholder.typicode.com/users/${data}`).then(userData => userData.json()).then(UserName => {
            postTitle.innerHTML = `Post by <span class="colorize">${UserName.name}</span>`
        });

        // code for show blogs in user.html 
        fetch(`https://jsonplaceholder.typicode.com/posts/`).then(bloggers => bloggers.json()).then(blogger => {

            for (let i = 0; i < blogger.length; i++) {
                const element = blogger[i];
                if (element.userId == data) {
                    let tags = `
                                <div class="blog">
                                        <img src="https://via.placeholder.com/600/b0f7cc" alt="blogs-image">
                                        <div class="details">
                                            <h3 class="title">${element.title.substr(0, 40)}</h3>
                                            <p class="text">${element.body.substr(0, 70)}</p>
                                            <a href="#" data-id="" class="readmore" onclick="showBlog(${element.id})">Read more</a>
                                        </div>
                                </div>`;
                    document.querySelector(".bloggers-blog").innerHTML += tags;
                }

            }
        })
    }
}


// function for again showing up single page in userspage 
function showBlog(postId) {

    if (postId) {
        // show single post pages 
        bloggerContent.style.display = 'none';
        document.querySelector(".single-post-content").style.display = 'block';
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()).then(data => {

            let PostTags = ` <img width="500" src="https://via.placeholder.com/600/b0f7cc" alt="blogs-image">
                            <h3 class="title">${data.title}</h3>
                            <p class="single-post-desc">${data.body} post id ${data.id}</p>`;
            document.querySelector(".single-post-content .post-details").innerHTML = PostTags;
            fetch(`https://jsonplaceholder.typicode.com/comments`).then(comm => comm.json()).then(comments => {
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].postId === data.id) {
                        let tags = `<div class="comment"> 
                                <div class="comment-header">
                                    <div class="avatar">${comments[i].email.split('')[0]}</div>
                                    <div class="username">${comments[i].email}</div>
                                </div>
                                <div class="comment-body">
                                    <strong class="title">${comments[i].name}</strong>
                                    <p class="text">${comments[i].body}</p>
                                </div>
                            </div>`;
                        document.querySelector(".comments").innerHTML += tags;
                    }
                }
            })
        })

        // show images in post 
    }

}