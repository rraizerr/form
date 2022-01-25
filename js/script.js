"use stritc";
import posts from "./modules/posts";
import bindPostData from "./modules/form";

window.addEventListener("DOMContentLoaded", () => {

    bindPostData();
    
    posts();

});