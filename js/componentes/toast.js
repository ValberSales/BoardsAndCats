export function showToast(titulo, imagem) {
    // Cria o elemento do toast
    const toastHTML = `
        <div class="toast position-fixed p-3" style="z-index: 1050;">
            <div class="toast-body d-flex align-items-center bg-light border rounded">
                <img src="${imagem}" class="me-2 rounded" style="width: 60px; height: 60px; object-fit: cover;" alt="${titulo}">
                <div>
                    <strong class="d-block">${titulo}</strong>
                    <span>adicionado ao carrinho!</span>
                </div>
            </div>
        </div>
    `;

    // Adiciona o toast ao body
    document.body.insertAdjacentHTML('beforeend', toastHTML);

    // Inicializa o toast com Bootstrap
    const toastElement = document.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, { delay: 850 });

    // Mostra o toast
    toast.show();

    // Remove o toast após desaparecer
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}