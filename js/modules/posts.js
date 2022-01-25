import {getResource} from "../services/services"
// Вытаскиваем посты из базы данных
function posts() {
    class Post {
        constructor(name, text, ...classes) {
            // this.id = id;
            this.name = name;
            this.text = text;
            // this.visible = visible;
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

    // getResource("http://localhost:3000/data")
    // .then(data => {
    //     data.forEach(({name, text}) => {
    //         new Post(name, text, "post").render();
    //     });
    // });

    function addPost(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let obj = JSON.parse(JSON.stringify(data));
            // console.log(obj);
            showLinks(obj);
            return obj.data;
        }).then(data => {
            data.forEach(({ name, text }) => {
                new Post(name, text, "post").render();
            });
        });
    }
    
    addPost("https://jordan.ashton.fashion/api/goods/30/comments")

    // let currentPage = 1; 
    // 1. На показать еще делать новый реквест currentPage++;

    function showLinks(obj) {
        const { links } = obj;
        const parent = document.querySelector(".pagination");
        const postList = document.querySelector(".posts-list");
        console.log(obj);
        links.forEach((item) => {
            const element = document.createElement("li");
            if (item.active) {
                element.classList.add("active");
                postList.innerHTML = "";
            }
            // if (index == obj.current_page && obj.current_page < 2) {
            //     element.classList.add("active");
            //     parent.firstElementChild.classList.add("disabled");
            //     document.querySelector(".posts-list").innerHTML = "";
            //     console.log(obj);
            // } else if (index == obj.current_page && obj.current_page > 1) {
            //     element.classList.add("active");
            //     document.querySelector(".posts-list").innerHTML = "";
            // } else if (index == obj.current_page && index == obj.last_page) {
            //     element.classList.add("active");
            //     parent.lastElementChild.classList.add("disabled");
            // }

            element.innerHTML = `
                <a href="">${item.label}</a>`;
            parent.append(element);
            
            if (item.url == null) {
                element.classList.add("disabled");
            }

            element.addEventListener("click", e => {
                e.preventDefault();
                parent.innerHTML = " ";
                addPost(item.url);
                
            });
                
        });
    }

}

export default posts;