"use strict";

function getPosts() {
    class Post {
        constructor(name, text, ...classes) {
            this.name = name;
            this.text = text;
            this.classes = classes;
            this.parent = document.querySelector(".posts-list");
        }

        render() {
            const element = document.createElement("li");

            if (this.classes.length === 0) {
                this.element = "post";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <span class="name">${this.name}</span>
                <span class="message"><pre>${this.text}</pre></span>
            `;
            this.parent.append(element);
        }
    }

    async function showPosts(url) {
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let obj = JSON.parse(JSON.stringify(data));
                renderAll(obj);
            });
    }

    showPosts("https://jordan.ashton.fashion/api/goods/30/comments");

    function renderAll(commentsResponse) {
        const {links, data: comments, "next_page_url": nextPageUrl} = commentsResponse;

        renderComments(comments);

        renderPaginationLinks(links);

        addShowMoreButtonHandler(nextPageUrl);
    }

    function renderComments(comments) {
        comments.forEach(({name, text}) => {
            new Post(name, text, "post").render();
        });
    }

    function renderPaginationLinks(links) {
        const parent = document.querySelector(".pagination");
        const postList = document.querySelector(".posts-list");
        const btn = document.querySelector(".btn-pagination");
        parent.innerHTML = "";

        links.forEach(link => {
            const element = document.createElement("li");
            if (link.active) {
                element.classList.add("active");
            }

            element.innerHTML = `<a href="">${link.label}</a>`;
            parent.append(element);

            if (link.url === null) {
                element.classList.add("disabled");
            }

            element.addEventListener("click", e => {
                e.preventDefault();
                postList.innerHTML = "";
                parent.innerHTML = " ";
                showPosts(link.url);
                if (btn.classList.contains("hide")) {
                    btn.classList.remove("hide");
                }
            });

        });
    }

    function addShowMoreButtonHandler(nextPageUrl) {
        document.querySelector(".btn-pagination").onclick = function () {
            if (nextPageUrl) {
                showPosts(nextPageUrl);
            } else if (nextPageUrl == null) {
                document.querySelector(".btn-pagination").classList.add("hide");
            }
            
        };
    }

}

export default getPosts;