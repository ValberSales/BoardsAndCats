
export function createCard(id, imagem, titulo, preco) {

  // Calcula o valor parcelado
  let parcelas = 1;
  if (preco < 20) {
    parcelas = 1;
  } else if (preco >= 20 && preco < 50) {
    parcelas = 3;
  } else if (preco >= 50 && preco < 100) {
    parcelas = 5;
  } else if (preco >= 100) {
    parcelas = 10;
  }
  const valorParcelado = (preco / parcelas).toFixed(2);

  return `
<div class="col cardwidth">
            <div class="card h-100 d-flex flex-column">
                <a href="produto.html?id=${id}" class="cardlink">
                    <img src="${imagem}" class="card-img-top cardimg" alt="${titulo}">
                </a>
                <div class="d-flex flex-column mt-auto">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text m-0">R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}</p>
                        <p class="txtparcela m-0">ou ${parcelas} x R$ ${parseFloat(valorParcelado).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-bd-primary addcarrinho w-100" data-id="${id}">
                            <i data-feather="shopping-cart"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>

    `;
}