// Seleccionamos el container donde estarán las cards
const container = document.querySelector(".container");


// Función reutilizable para crear una Card
function crearCard(imagen, titulo, descripcion, descripcionExtendida) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <img src="${imagen}" alt="${titulo}">

    <div class="card-content">
        <h2>${titulo}</h2>
        <p>${descripcion}</p>
        <button class="btn-ver-mas" type="button">Ver más</button>
    </div>
`;
    const button = card.querySelector(".btn-ver-mas");
    button.dataset.descripcion = descripcionExtendida;
    button.dataset.titulo = titulo;
    button.dataset.imagen = imagen;
    return card;
}


// Creamos 10 cards reutilizando la misma función
container.appendChild(
    crearCard(
        "images/coffee1.jpg",
        "Espresso",
        "Un café intenso y tradicional.",
        "El espresso se prepara haciendo pasar agua caliente a presión por café finamente molido. Su extracción breve concentra los aromas y produce una capa dorada de crema. Es la base de muchas bebidas de café y se disfruta mejor recién preparado."
    )
);

container.appendChild(
    crearCard(
        "images/coffee2.jpg",
        "Cappuccino",
        "Café con leche y espuma.",
        "El cappuccino combina espresso, leche caliente y una capa generosa de espuma cremosa. Su equilibrio entre intensidad y suavidad lo convierte en una bebida clásica para cualquier momento del día."
    )
);

container.appendChild(
    crearCard(
        "images/coffee3.jpg",
        "Latte",
        "Café suave con leche.",
        "El latte mezcla uno o dos shots de espresso con abundante leche vaporizada y una fina capa de espuma. El resultado es una bebida suave, aterciopelada y fácil de personalizar con distintos sabores."
    )
);

container.appendChild(
    crearCard(
        "images/coffee4.jpg",
        "Americano",
        "Espresso combinado con agua caliente.",
        "El café americano se prepara añadiendo agua caliente a un espresso. Conserva el carácter aromático del café, pero ofrece una taza más larga y ligera, ideal para saborear con calma."
    )
);

container.appendChild(
    crearCard(
        "images/coffee5.jpg",
        "Mocha",
        "Café combinado con chocolate.",
        "El mocha une espresso, chocolate y leche vaporizada en una bebida de sabor profundo y dulce. Puede terminarse con espuma de leche o un toque de cacao para realzar sus notas achocolatadas."
    )
);

container.appendChild(
    crearCard(
        "images/coffee6.jpg",
        "Macchiato",
        "Espresso con un toque de leche.",
        "Macchiato significa marcado: un espresso al que se añade una pequeña cantidad de leche o espuma. Ese toque suaviza el café sin ocultar su intensidad ni sus aromas."
    )
);

container.appendChild(
    crearCard(
        "images/coffee7.jpg",
        "Cold Brew",
        "Café preparado en frío.",
        "El cold brew se obtiene dejando café molido en agua fría durante varias horas. La extracción lenta crea una bebida refrescante, de perfil suave y baja acidez, que se sirve con hielo."
    )
);

container.appendChild(
    crearCard(
        "images/coffee8.jpg",
        "Frappé",
        "Café frío y refrescante.",
        "El frappé es una bebida fría de café mezclado con hielo hasta lograr una textura espumosa. Se puede acompañar con leche y ajustar su dulzor para disfrutarlo como una opción refrescante."
    )
);

container.appendChild(
    crearCard(
        "images/coffee9.jpg",
        "Irish Coffee",
        "Café preparado al estilo irlandés.",
        "El Irish coffee combina café caliente con whiskey irlandés y azúcar, coronado tradicionalmente con una capa de crema. Sus sabores cálidos y tostados hacen de esta una bebida para disfrutar despacio."
    )
);

container.appendChild(
    crearCard(
        "images/coffee10.jpg",
        "Caramel Coffee",
        "Café con un delicioso toque de caramelo.",
        "Esta bebida combina café recién preparado con caramelo, que aporta notas dulces y ligeramente tostadas. Puede servirse con leche vaporizada para obtener una textura más cremosa."
    )
);

container.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-ver-mas");
    if (!button) return;

    sessionStorage.setItem("cafeSeleccionado", JSON.stringify({
        titulo: button.dataset.titulo,
        descripcion: button.dataset.descripcion,
        imagen: button.dataset.imagen
    }));
    const detailUrl = new URL("./detalle.html", window.location.href);
    window.location.assign(detailUrl.href);
});

if ("serviceWorker" in navigator && window.isSecureContext) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./serviceworker.js")
            .catch((error) => console.error("No se pudo registrar el service worker:", error));
    });
}
