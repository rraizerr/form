import {postData} from "../services/services"
// Отправляем пост в базу данных
function bindPostData() {
    const form = document.querySelector(".form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData("http://localhost:3000/data", json).then(data => {
            console.log(data);
        });
    });
    
}

export default bindPostData;