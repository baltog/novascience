const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const notification = document.getElementById("notification");

const articles = [
    ...document.querySelectorAll(".article-card")
];


// =========================
// NOTIFICATION
// =========================

function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}


// =========================
// RECHERCHE
// =========================

function searchNovaScience() {

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {

        showNotification(
            "Écris un sujet scientifique à rechercher."
        );

        return;
    }


    let results = 0;


    articles.forEach(article => {

        const content =
            article.textContent.toLowerCase();

        if (content.includes(query)) {

            article.style.display = "flex";

            results++;

        } else {

            article.style.display = "none";
        }

    });


    document
        .getElementById("articles")
        .scrollIntoView({
            behavior: "smooth"
        });


    if (results > 0) {

        showNotification(
            `${results} résultat(s) trouvé(s).`
        );

    } else {

        showNotification(
            "Aucun résultat dans la V1. Le moteur scientifique avancé arrive bientôt."
        );
    }
}


searchButton.addEventListener(
    "click",
    searchNovaScience
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchNovaScience();
        }
    }
);


// =========================
// CATÉGORIES
// =========================

function filterCategory(category) {

    let results = 0;


    articles.forEach(article => {

        const articleCategory =
            article.dataset.category;


        if (
            category === "Tous" ||
            articleCategory === category
        ) {

            article.style.display = "flex";

            results++;

        } else {

            article.style.display = "none";
        }

    });


    document
        .getElementById("articles")
        .scrollIntoView({
            behavior: "smooth"
        });


    showNotification(
        results +
        " dossier(s) disponible(s) dans cette catégorie."
    );
}


document
    .querySelectorAll("[data-category]")
    .forEach(element => {

        element.addEventListener(
            "click",
            () => {

                filterCategory(
                    element.dataset.category
                );

            }
        );

    });


// =========================
// BOUTONS DES ARTICLES
// =========================

document
    .querySelectorAll(".read-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showNotification(
                    "Le dossier complet sera disponible dans une prochaine version."
                );

            }
        );

    });


// =========================
// MODE CLAIR / SOMBRE
// =========================

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");


        if (
            document.body.classList.contains("light")
        ) {

            themeButton.textContent = "☀";

            localStorage.setItem(
                "novascience-theme",
                "light"
            );

        } else {

            themeButton.textContent = "☾";

            localStorage.setItem(
                "novascience-theme",
                "dark"
            );

        }

    }
);


// =========================
// CHARGEMENT DU THÈME
// =========================

const savedTheme =
    localStorage.getItem(
        "novascience-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.textContent = "☀";
}


// =========================
// MESSAGE DE DÉMARRAGE
// =========================

console.log(
    "NovaScience V1 — Explorer. Comprendre. Découvrir."
);
