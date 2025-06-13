// Функция валидации URL изображения
export const validateImageUrl = (url) => {
    return fetch(url, { method: 'HEAD' })
    .then((response) => {
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            return contentType && contentType.startsWith('image/');
        }
        return false;
    })
    .catch((error) => {
        console.error('Ошибка проверки изображения:', error);
        return false;
    });
} 