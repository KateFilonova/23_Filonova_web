class Block {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    toHtml() {
        throw new Error("Метод toHtml должен быть реализован в подклассе");
    }
}

class HeroBlock extends Block {
    toHtml() {
        return `
            <div class="hero">
                <img src="${this.content.image}" alt="${this.title}">
                <div class="hero-content">
                    <h1>${this.title}</h1>
                    <p>${this.content.text}</p>
                </div>
            </div>
        `;
    }
}

class InfoBlock extends Block {
    toHtml() {
        const listItems = this.content.map(item => `<li>${item}</li>`).join("");
        return `
            <div class="block">
                <h2>${this.title}</h2>
                <ul>${listItems}</ul>
            </div>
        `;
    }
}

class AchievementsBlock extends Block {
    toHtml() {
        const listItems = this.content.map(item => `<li>${item}</li>`).join("");
        return `
            <div class="block">
                <h2>${this.title}</h2>
                <ul>${listItems}</ul>
            </div>
        `;
    }
}

class HobbiesBlock extends Block {
    toHtml() {
        const listItems = this.content.map(item => `<li>${item}</li>`).join("");
        return `
            <div class="block">
                <h2>${this.title}</h2>
                <ul>${listItems}</ul>
            </div>
        `;
    }
}

class PersonalLifeBlock extends Block {
    toHtml() {
        const listItems = this.content.map(item => `<li>${item}</li>`).join("");
        return `
            <div class="block">
                <h2>${this.title}</h2>
                <ul>${listItems}</ul>
            </div>
        `;
    }
}

class ContactBlock extends Block {
    toHtml() {
        const contactsHtml = this.content.map(contact => `<a href="${contact.link}">${contact.text}</a>`).join("<br>");
        return `
            <div class="block">
                <h2>${this.title}</h2>
                <p>${contactsHtml}</p>
            </div>
        `;
    }
}

class ButtonBlock extends Block {
    toHtml() {
        return `
            <div class="button-container">
                <a href="${this.content.link}" class="button">${this.content.text}</a>
            </div>
        `;
    }
}

let isEditMode = false;

// Функция для переключения режима редактирования
function toggleEditMode() {
    isEditMode = !isEditMode;
    const button = document.getElementById("toggle-edit-mode");
    if (isEditMode) {
        button.textContent = "Режим просмотра";
        enableEditMode();
    } else {
        button.textContent = "Режим редактирования";
        disableEditMode();
    }
}

// Включение режима редактирования
function enableEditMode() {
    const blocks = document.querySelectorAll(".block, .hero");
    blocks.forEach(block => {
        block.setAttribute("contenteditable", true); 
        block.style.border = "2px dashed #ccc"; 
    });

    document.getElementById("add-block").style.display = "inline-block";
    document.querySelectorAll(".delete-block").forEach(button => {
        button.style.display = "inline-block";
    });
}

// Отключение режима редактирования
function disableEditMode() {
    const blocks = document.querySelectorAll(".block, .hero");
    blocks.forEach(block => {
        block.setAttribute("contenteditable", false);
        block.style.border = "none";
    });

    // Скрываем кнопки для добавления и удаления блоков
    document.getElementById("add-block").style.display = "none";
    document.querySelectorAll(".delete-block").forEach(button => {
        button.style.display = "none";
    });
}

// Функция для добавления нового блока
function addNewBlock() {
    const newBlock = new InfoBlock("Новый блок", ["Редактируйте этот текст"]);
    const app = document.getElementById("app");
    app.appendChild(createBlockElement(newBlock));
}

// Функция для создания элемента блока
function createBlockElement(block) {
    const div = document.createElement("div");
    div.innerHTML = block.toHtml();
    if (isEditMode) {
        div.setAttribute("contenteditable", true);
        div.style.border = "2px dashed #ccc";
    }
    // Добавляем кнопку удаления
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить блок";
    deleteButton.className = "delete-block";
    deleteButton.style.display = isEditMode ? "inline-block" : "none";
    deleteButton.addEventListener("click", () => div.remove());
    div.appendChild(deleteButton);
    return div;
}

// Функция для сборки страницы
function buildPage(blocks) {
    const app = document.getElementById("app");
    if (!app) {
        console.error("Элемент с id='app' не найден!");
        return;
    }
    app.innerHTML = ""; 
    blocks.forEach(block => {
        app.appendChild(createBlockElement(block));
    });
}

// Функция для настройки обработчиков событий
function setupEventListeners() {
    document.getElementById("toggle-edit-mode").addEventListener("click", toggleEditMode);

    document.getElementById("add-block").addEventListener("click", addNewBlock);
}

// Создание блоков
const hero = new HeroBlock("Артемий Лебедев", {
    image: "image/artemy.jpg",
    text: "Дизайнер, основатель «Студии Артемия Лебедева»."
});
const info = new InfoBlock("Основная информация", [
    "Место рождения: Москва, Россия",
    "Дата рождения: 13 февраля 1975 года"
]);
const achievements = new AchievementsBlock("Достижения", [
    "Основатель студии Артемия Лебедева",
    "Mедаль ордена «За заслуги перед Отечеством» II степени",
    "Создание логотипа «Яндекса»",
    "Разработка дизайна Московского метрополитена",
    "Директор по дизайну социальной сети «ВКонтакте»",
]);
const hobbies = new HobbiesBlock("Занятия вне профессиональной сферы", [
    "Увлечение фотографией",
    "Коллекционирование редких книг",
    "Путешествия"
]);
const personalLife = new PersonalLifeBlock("Личная жизнь", [
    "Женат, десять детей",
    "Активный участник социальных проектов"
]);
const contact = new ContactBlock("Контакты", [
    { text: "Email: info@artlebedev.ru", link: "mailto:info@artlebedev.ru" },
]);
const button = new ButtonBlock("Кнопка", { text: "Узнать больше о Теме", link: "https://www.artlebedev.ru" });

function renderPage(blocks) {
    document.body.innerHTML = "";

    const header = document.createElement("header");
    header.innerHTML = `
        <h1>Сайт об Артемии Лебедеве</h1>
        <button id="toggle-edit-mode">Режим редактирования</button>
        <button id="add-block" style="display: none;">Добавить блок</button>
    `;
    document.body.appendChild(header);

    const app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);

    buildPage(blocks);

    setupEventListeners();
}

renderPage([hero, info, achievements, hobbies, personalLife, contact, button]);