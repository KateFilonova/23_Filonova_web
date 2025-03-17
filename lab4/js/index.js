function saveReviews(reviews) {
    const reviewsString = JSON.stringify(reviews);
    document.cookie = `reviews=${encodeURIComponent(reviewsString)}; max-age=86400; path=/`; // Сохраняем на 1 день
}

function loadReviews() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === "reviews") {
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return [
        { name: "Егор Колганов", text: "ЭТИ НАУШНИКИ ИЗМЕНИЛИ МОЮ ЖИЗНЬ! ТЕПЕРЬ Я МОГУ СЛУШАТЬ МУЗЫКУ ДАЖЕ В ДУШЕ!" },
        { name: "Эрик Сарксян", text: "Я КУПИЛ ИХ, И ТЕПЕРЬ ВСЕ ДЕВУШКИ ХОТЯТ СО МНОЙ ПОЗНАКОМИТЬСЯ!" },
        { name: "Мария Ковалева", text: "ЛУЧШЕЕ, ЧТО СЛУЧАЛОСЬ СО МНОЙ ПОСЛЕ ИЗОБРЕТЕНИЯ КОЛЕСА!" }
    ];
}

let reviews = loadReviews();

function renderReviews() {
    const reviewGrid = document.getElementById("reviewGrid");
    reviewGrid.innerHTML = "";
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p>${review.text}</p>
            <span>- ${review.name}</span>
            <button class="delete-btn" data-index="${index}">Удалить</button>
        `;
        reviewGrid.appendChild(reviewElement);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            deleteReview(index);
        });
    });
}

function deleteReview(index) {
    reviews.splice(index, 1); 
    saveReviews(reviews); 
    renderReviews(); 
}

const reviewForm = document.getElementById("reviewForm");
reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reviewName").value;
    const text = document.getElementById("reviewText").value;
    if (name && text) {
        reviews.push({ name, text });
        saveReviews(reviews); 
        renderReviews(); 
        reviewForm.reset(); 
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
});

renderReviews();

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

setTimeout(() => {
    document.getElementById('popup1').style.display = 'block';
}, 5000);

const themeToggleBtn = document.getElementById("themeToggleBtn");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggleBtn.textContent = "☀️";
    } else {
        themeToggleBtn.textContent = "🌙";
    }
});