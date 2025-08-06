const listItem = document.querySelectorAll('li')
function toggleDone(e){
    if (!e.target.className){
        e.target.className = 'done';
    }else{
        e.target.className = '';
    }
}

listItem.forEach((item) => {
    item.addEventListener('click', toggleDone);
})