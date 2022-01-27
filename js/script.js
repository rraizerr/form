"use stritc";
import getPosts from "./modules/posts";
import formPostRequest from "./modules/form";

window.addEventListener("DOMContentLoaded", () => {

    formPostRequest();
    
    getPosts();

});