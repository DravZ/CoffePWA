const container = document.querySelector("#coffee-detail");
let cafe;

try {
    cafe = JSON.parse(sessionStorage.getItem("cafeSeleccionado"));
} catch {
    cafe = null;
}

if (cafe?.titulo && cafe?.descripcion && cafe?.imagen) {
    const detail = document.createElement("article");
    detail.classList.add("coffee-detail");

    const image = document.createElement("img");
    image.classList.add("detail-image");
    image.src = cafe.imagen;
    image.alt = cafe.titulo;

    const content = document.createElement("div");
    content.classList.add("detail-content");

    const heading = document.createElement("h2");
    heading.textContent = cafe.titulo;

    const paragraph = document.createElement("p");
    paragraph.textContent = cafe.descripcion;

    content.append(heading, paragraph);
    detail.append(image, content);
    container.append(detail);
    document.title = `${cafe.titulo} | Coffee PWA`;
} else {
    const message = document.createElement("p");
    message.textContent = "No se encontró la información del café.";
    container.append(message);
}
