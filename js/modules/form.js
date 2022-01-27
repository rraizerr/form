"use strict";

function formPostRequest() {

    const message = {
        success: "Вы добавили новый комментарий",
        fail: "Что-то пошло не так..."
    };

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

            postData("https://jordan.ashton.fashion/api/goods/30/comments", json)
                .then(data => {
                    console.log(data);
                    showMessage(message.success);
                })
                .catch(() => {
                    showMessage(message.fail);
                }).finally(() => {
                    form.reset();
                });
        });
        
    }

    function showMessage(message) {
        const sendMessage = document.createElement("div");

        sendMessage.classList.add("message-wrapper");
        sendMessage.innerHTML = `<span class="show-message">${message}</span>`;
        document.querySelector(".form").append(sendMessage);

        setTimeout(() => {
            sendMessage.remove();
        }, 4000);
    }

    bindPostData();

}

export default formPostRequest ;