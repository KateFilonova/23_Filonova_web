document.addEventListener("DOMContentLoaded", function () {
    const startGameButton = document.getElementById("startGame");

    startGameButton.addEventListener("click", function () {
        alert("Добро пожаловать в дуэль ковбоев! Будьте готовы стрелять!");

        if (!confirm("Вы готовы к дуэли?")) {
            alert("Вы отказались от дуэли. Игра окончена.");
            return;
        }

        const minTime = 2000;
        const maxTime = 5000;
        const reactionTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime;

        alert("Приготовьтесь... Ждите сигнала!");

        setTimeout(() => {
            const startTime = Date.now();
            const shot = prompt("Стреляйте! Введите 'Бах' и нажмите Enter!");
            const endTime = Date.now();

            if (!shot || shot.toLowerCase() !== "бах") {
                alert("Вы промедлили или ввели неверную команду! Вы проиграли!");
                return;
            }

            const reaction = (endTime - startTime) / 1000;

            if (reaction < 0.5) {
                alert(`Молниеносный выстрел! Ваша реакция: ${reaction} секунд. Вы победили!`);
            } else {
                alert(`Выстрел слишком медленный... Ваша реакция: ${reaction} секунд. Вы проиграли.`);
            }
        }, reactionTime);
    });
});
window.onscroll = function () {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

