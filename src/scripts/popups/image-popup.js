const popup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const popupCaption = document.getElementById('popupCaption');

// Функция для открытия модального окна
export function showImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc; // Устанавливаем изображение в модальном окне
    popupCaption.textContent = imageAlt; // Устанавливаем подпись
    popup.style.display = 'flex'; // Показываем модальное окно
}