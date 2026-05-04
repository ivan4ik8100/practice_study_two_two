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
    const maleRadio = document.getElementById("Female_Muzik");
    const femaleRadio = document.getElementById("Female_Jensk");
    if (maleRadio && femaleRadio) {
        maleRadio.addEventListener("change", function() {
            if (this.checked) {
                this.style.transform = "scale(1.1)";
                setTimeout(() => this.style.transform = "scale(1)", 200);
            }
        });
        
        femaleRadio.addEventListener("change", function() {
            if (this.checked) {
                this.style.transform = "scale(1.1)";
                setTimeout(() => this.style.transform = "scale(1)", 200);
            }
        });
    }
    
    if (registerButton) {
        registerButton.addEventListener("click", function(event) {
            event.preventDefault();
            const loginInput = document.getElementById("registr_login_input");
            const emailInput = document.getElementById("registr_email_input");
            const passwordInput = document.getElementById("registr_password_input");
            const password2Input = document.getElementById("registr_password2_input");
            
            let errorContainer = document.getElementById("error_messages");
            
            errorContainer.innerHTML = "";
            removeErrorClasses([loginInput, emailInput, passwordInput, password2Input]);
            
            let errors = [];
            
            if (loginInput.value.trim() === "") {
                errors.push("Логин не может быть пустым");
                addErrorClass(loginInput);
            }
            
            if (emailInput.value.trim() === "") {
                errors.push("Email не может быть пустым");
                addErrorClass(emailInput);
            }
            
            if (passwordInput.value.trim() === "") {
                errors.push("Пароль не может быть пустым");
                addErrorClass(passwordInput);
            }
            
            if (password2Input.value.trim() === "") {
                errors.push("Подтверждение пароля не может быть пустым");
                addErrorClass(password2Input);
            }

            if (emailInput.value.trim() !== "") {
                if (!validateEmail(emailInput.value.trim())) {
                    errors.push("Некорректный формат email. Пример: name@domain.com");
                    addErrorClass(emailInput);
                }
            }

            if (passwordInput.value.trim() !== "" && password2Input.value.trim() !== "") {

                if (passwordInput.value.length < 8) {
                    errors.push("Пароль должен содержать минимум 8 символов");
                    addErrorClass(passwordInput);
                    addErrorClass(password2Input);
                }
                
                if (passwordInput.value !== password2Input.value) {
                    errors.push("Пароли не совпадают");
                    addErrorClass(passwordInput);
                    addErrorClass(password2Input);
                }
            }
            

            if (!maleRadio.checked && !femaleRadio.checked) {
                errors.push("Пожалуйста, выберите пол");

                document.getElementById("gender_form").style.border = "2px solid #ff3333";
            } else {
                document.getElementById("gender_form").style.border = "none";
            }
            

            if (errors.length > 0) {
                showErrors(errorContainer, errors);
                return;
            }
            

            showSuccess(errorContainer, "Регистрация успешна! Перенаправляем...");

            addSuccessClass([loginInput, emailInput, passwordInput, password2Input]);

            setTimeout(function() {
                window.location.href = "Osnova1.html";
            }, 1500);
        });
    }
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function showErrors(container, errors) {
    container.innerHTML = ""; 
    
    errors.forEach(function(error) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = "• " + error;
        container.appendChild(errorDiv);
    });
}

function showSuccess(container, message) {
    container.innerHTML = ""; 
    
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = "✓ " + message;
    container.appendChild(successDiv);
}

function addErrorClass(element) {
    element.classList.add("error");
    element.classList.remove("success");
}

function addSuccessClass(elements) {
    elements.forEach(function(element) {
        element.classList.add("success");
        element.classList.remove("error");
    });
}

function removeErrorClasses(elements) {
    elements.forEach(function(element) {
        element.classList.remove("error", "success");
    });
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
