import showPosts from "./posts"

function bindPostData() {
    const form = document.querySelector(".form");

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await response.json();
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData("https://jordan.ashton.fashion/api/goods/30/comments", json).then(data => {
            // showPosts("https://jordan.ashton.fashion/api/goods/30/comments");
        });
    });
    
}

export default bindPostData;