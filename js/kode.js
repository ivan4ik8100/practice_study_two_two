const gamesData = [
    {
        image: "images/6984543509.jpg",
        name: "Ведьмак 3: Дикая Охота",
        description: "Ролевая игра в открытом мире, где вы играете за охотника на чудовищ Геральта из Ривии.",
        genre: "RPG, Открытый мир, Фэнтези"
    },
    {
        image: "images/6984543509.jpg",
        name: "Cyberpunk 2077",
        description: "Приключенческая RPG в мире будущего, полном технологий и опасностей.",
        genre: "RPG, Киберпанк, Экшен"
    },
    {
        image: "images/6984543509.jpg",
        name: "Red Dead Redemption 2",
        description: "Вестерн в открытом мире с захватывающим сюжетом и реалистичной графикой.",
        genre: "Экшен, Открытый мир, Вестерн"
    },
    {
        image: "images/6984543509.jpg",
        name: "The Last of Us",
        description: "Постапокалиптическая драма о выживании и человеческих отношениях.",
        genre: "Экшен, Хоррор, Драма"
    },
    {
        image: "images/6984543509.jpg",
        name: "Elden Ring",
        description: "Темное фэнтези с открытым миром от создателей Dark Souls.",
        genre: "RPG, Фэнтези, Экшен"
    },
    {
        image: "images/6984543509.jpg",
        name: "God of War",
        description: "Приключенческий экшен с мифологией и эпическими битвами.",
        genre: "Экшен, Фэнтези, Драма"
    }
];

//========================================================================= главная
function displayPopularGames() {
    const gamesList = document.getElementById("glavnaya_games_list");
    if (!gamesList) return;
    
    gamesList.innerHTML = "";
    
    const popularGames = gamesData.slice(0, 4);
    
    popularGames.forEach((game, index) => {
        const gameElement = document.createElement("a");
        gameElement.href = "";
        gameElement.innerHTML = `
            <div class="Spisok_element" id="glavnaya_game_${index + 1}">
                <div class="kub_logo" id="glavnaya_game_${index + 1}_logo"> 
                    <img src="${game.image}" alt="${game.name}"> 
                </div>
                <div class="Name" id="glavnaya_game_${index + 1}_name"> 
                    <p>${game.name}</p> 
                </div>
                <div class="Detals" id="glavnaya_game_${index + 1}_description"> 
                    <p>${game.description}</p> 
                </div>
                <div class="Kate" id="glavnaya_game_${index + 1}_genre"> 
                    <p>${game.genre}</p> 
                </div>
            </div>
        `;
        gamesList.appendChild(gameElement);
    });
}

//========================================================================= Регистрация
function initRegistration() {
    const registerButton = document.getElementById("registr_knopka_zareg");
    if (registerButton) {
        registerButton.addEventListener("click", function(event) {
            const loginInput = document.getElementById("registr_login_input");
            const emailInput = document.getElementById("registr_email_input");
            const passwordInput = document.getElementById("registr_password_input");
            const password2Input = document.getElementById("registr_password2_input");
                
            if (loginInput.value.trim() !== "" && 
                emailInput.value.trim() !== "" && 
                passwordInput.value.trim() !== "" && 
                password2Input.value.trim() !== "") {
                    window.location.href = "Osnova1.html";
                } else {
                    alert("Пожалуйста, заполните все поля");
                }
        });
    }
}

//========================================================================== вход
function initLogin() {
    const loginButton = document.getElementById("vhod_knopka_vhod");
    if (loginButton) {
        loginButton.addEventListener("click", function(event) {
            const loginInput = document.getElementById("vhod_login_input");
            const passwordInput = document.getElementById("vhod_password_input");
                
            if (loginInput.value.trim() !== "" && 
                passwordInput.value.trim() !== "") {
                window.location.href = "Osnova1.html";
            } else {
                alert("Пожалуйста, заполните все поля");
            }
        });
    }
}

//========================================================================== поиск
function displayGames(games) {
    const gamesList = document.getElementById("poisk_games_list");
    if (!gamesList) return;
    
    gamesList.innerHTML = "";
    
    if (games.length === 0) {
        gamesList.innerHTML = "<div style=\"text-align: center; padding: 20px;\">Ничего не найдено</div>";
        return;
    }
    
    games.forEach((game, index) => {
        const gameElement = document.createElement("a");
        gameElement.href = "";
        gameElement.innerHTML = `
            <div class="Spisok_element" id="poisk_game_${index + 1}">
                <div class="kub_logo" id="poisk_game_${index + 1}_logo"> 
                    <img src="${game.image}" alt="${game.name}"> 
                </div>
                <div class="Name" id="poisk_game_${index + 1}_name"> 
                    <p>${game.name}</p> 
                </div>
                <div class="Detals" id="poisk_game_${index + 1}_description"> 
                    <p>${game.description}</p> 
                </div>
                <div class="Kate" id="poisk_game_${index + 1}_genre"> 
                    <p>${game.genre}</p> 
                </div>
            </div>
        `;
        gamesList.appendChild(gameElement);
    });
}

function filterGames() {
    const searchText = document.getElementById("poisk_search_input").value.toLowerCase().trim();
    
    const selectedGenres = [];
    const checkboxes = document.querySelectorAll("#poisk_genre_filter input[type=\"checkbox\"]:checked");
    checkboxes.forEach(checkbox => {
        selectedGenres.push(checkbox.value);
    });
    
    let filteredGames = gamesData;
    
    if (searchText !== "") {
        filteredGames = filteredGames.filter(game => 
            game.name.toLowerCase().includes(searchText)
        );
    }
    
    if (selectedGenres.length > 0) {
        filteredGames = filteredGames.filter(game => {
            const gameGenres = game.genre.split(",").map(g => g.trim());
            return selectedGenres.some(selectedGenre => 
                gameGenres.includes(selectedGenre)
            );
        });
    }
    
    displayGames(filteredGames);
}

function initSearch() {
    if (document.getElementById("poisk_games_list")) {
        displayGames(gamesData);
        
        const searchButton = document.getElementById("poisk_search_button");
        if (searchButton) {
            searchButton.addEventListener("click", filterGames);
        }
        
        const searchInput = document.getElementById("poisk_search_input");
        if (searchInput) {
            searchInput.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    filterGames();
                }
            });
        }
        
        const randomButton = document.getElementById("poisk_random_button");
        if (randomButton) {
            randomButton.addEventListener("click", function() {
                const randomIndex = Math.floor(Math.random() * gamesData.length);
                const randomGame = [gamesData[randomIndex]];
                displayGames(randomGame);
            });
        }
        
        const recentButton = document.getElementById("poisk_recent_button");
        if (recentButton) {
            recentButton.addEventListener("click", function() {
                displayGames(gamesData);
                document.getElementById("poisk_search_input").value = "";
                const checkboxes = document.querySelectorAll("#poisk_genre_filter input[type=\"checkbox\"]");
                checkboxes.forEach(checkbox => checkbox.checked = false);
            });
        }
    }
}

//========================================================================== общий запуск
document.addEventListener("DOMContentLoaded", function() {
    displayPopularGames();
    initRegistration();
    initLogin();
    initSearch();
    
    const onasButton = document.getElementById("glavnaya_onas_button");
    if (onasButton) {
        onasButton.addEventListener("click", function() {
            alert("PlayBaza - платформа для поиска и скачивания приложений");
        });
    }
});