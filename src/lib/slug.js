// utils/slugHelpers.js

// Функция для преобразования названия в слаг
export function toSlug(str) {
    const map = {
        'ə': 'e',
        'ç': 'c',
        'ğ': 'g',
        'ı': 'i',
        'İ': 'i',
        'ö': 'o',
        'ş': 's',
        'ü': 'u',
    };

    return str
        .split('')
        .map(char => map[char] || char)  // Заменяем каждый символ, если есть в маппинге
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')             // Заменяем пробелы на дефисы
        .replace(/[^\w\-]+/g, '')         // Убираем все неалфавитные символы
        .replace(/--+/g, '-');            // Заменяем несколько дефисов на один
}