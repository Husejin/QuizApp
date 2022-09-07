const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

continue_btn.onclick= ()=>{
    location.href='./client.html'
}