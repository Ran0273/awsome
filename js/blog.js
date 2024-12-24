$(document).ready(() => {
    alldata = JSON.parse(jsonData);  // Все карточки, не изменяются

    // Отрисовка карточек при загрузке
    drawCards(alldata);

    // Обработчик для поиска по кнопке
    $('.search-do').on('click', () => {
        const search = $('.search-text').val().toLowerCase();
        filter(search, alldata);  // Поиск по тексту из поля ввода
    });

    // Обработчик для поиска по тегам
    initCardsHandler();  // Инициализация обработчиков событий для тегов
});

// Инициализация обработчиков для тегов
function initCardsHandler() {
    $('.blog-tags a').off().on('click', (e) => {
        e.preventDefault();
        const search = $(e.currentTarget).text().toLowerCase();  // Получаем текст тега
        filter(search, alldata);  // Поиск по тегу из всех карточек
    });
}

// Функция для отрисовки карточек
function drawCards(data) {
    $('.blog-container').html('');  // Очистить контейнер перед добавлением новых карточек

    if (data.length === 0) {
        // Если нет карточек для отображения
        $('.blog-container').html('<p>No results found.</p>');
    } else {
        data.forEach((item) => {
            let card = $(cardHtml);  // Клонируем шаблон карточки
            card.find('.blog-cover').css('background-image', 'url("img/blog/' + item.image + '")');
            card.find('.blog-title h2').text(item.title);
            card.find('.blog-text p').text(item.text);
            card.find('.blog-published-date').text(item.date);

            let tags = '';
            item.tags.forEach((tag) => {
                tags += '<li><a href="javascript:void(0);">' + tag + '</a></li>';
            });
            card.find('.blog-tags ul').html(tags);
            $('.blog-container').append(card);  // Добавляем карточку в контейнер
        });

        // Переинициализация обработчиков для тегов после отрисовки карточек
        initCardsHandler(data);
    }
}

// Функция для фильтрации данных
function filter(value, alldata) {
    // Фильтрация всех карточек в alldata
    const newData = alldata.filter((item) => {
        let result = 0;
        // Фильтрация по каждому полю: изображение, заголовок, текст, дата и теги
        result += item.image.toLowerCase().indexOf(value) > -1;
        result += item.title.toLowerCase().indexOf(value) > -1;
        result += item.text.toLowerCase().indexOf(value) > -1;
        result += item.date.toLowerCase().indexOf(value) > -1;
        result += item.tags.filter((tag) => {
            return tag.toLowerCase().indexOf(value) > -1;
        }).length;
        return result > 0;  // Возвращаем true, если хотя бы одно поле подходит под поиск
    });

    drawCards(newData);  // Отрисовка отфильтрованных карточек
}

const jsonData = '[{"image": "blog01.jpg", "title": "Situr amera tempor", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "2 days ago", "tags": ["canyon", "summer", "volkswagen"]},{"image": "blog02.jpg", "title": "Official grand tur", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit animest id est laborum.", "date": "3 days ago", "tags": ["city", "girl", "people", "work"]}, {"image": "blog03.jpg", "title": "Cilpalorem set deserunt", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "4 days ago", "tags": ["somersby", "summer", "ocean", "nothing"]}, {"image": "blog04.jpg", "title": "Lorem dolorem", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "5 days ago", "tags": [ "people", "thinkin", "nothing"]}]';
let alldata = JSON.parse(jsonData);
const cardHtml = '<section class="blog-card"><div class="blog-header"><div class="blog-cover"></div></div><div class="blog-body"><div class="blog-title"><h2>Lorem ipsum dolor sit amet</h2></div><div class="blog-text"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div><div class="blog-tags"><ul><li><a href="#">lorem</a></li><li><a href="#">proident</a></li><li><a href="#">amet</a></li><li><a href="#">laborum</a></li></ul></div><div class="blog-footer"><div class="blog-published-date">3 дня назад</div></div></div></section>';
