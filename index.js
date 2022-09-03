const popup = document.querySelector('.popup');
const openEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.button__close');

openEditButton.addEventListener('click', () =>{
popup.classList.add('popup_edit-button');
})
closePopupButton.addEventListener('click', () =>{
    popup.classList.remove('popup_edit-button');
    });


const cards = document.querySelectorAll('.cards');
const buttonsLike = document.querySelectorAll('.cards__like');
console.log(buttonsLike);
buttonsLike.forEach((button)=>{
    button.addEventListener('click', () =>{
        button.classList.toggle('cards__like_active');
    })
})

