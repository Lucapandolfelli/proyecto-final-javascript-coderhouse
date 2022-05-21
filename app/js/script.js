let navbarButton = document.getElementById('navbarButton');
let navbarMenu = document.getElementById('navbarMenu');

navbarButton.addEventListener('click', () =>{

    if(navbarButton.classList.contains('close')){
        navbarMenu.classList.remove('move-in');
        navbarMenu.classList.add('move-out');
        navbarButton.classList.remove('close');
    }else{
        navbarButton.classList.add('close');
        navbarMenu.style.display = 'flex';
        navbarMenu.classList.remove('move-out');
        navbarMenu.classList.add('move-in');
    }
    
});