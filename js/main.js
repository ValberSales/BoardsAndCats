import { createNavbar } from './componentes/navbar.js';
import { createFooter } from './componentes/footer.js';
import { createCard } from './componentes/card.js';
import { showToast } from './componentes/toast.js';

// Funções para configurar os listeners
function configurarListeners() {
    document.querySelectorAll('.addcarrinho').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            await adicionarAoCarrinho(id);
        });
    });
    console.log('listeners carregados')
}

function configurarListenersRemover() {
    document.querySelectorAll('.remover-item').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            await removerItemDoCarrinho(id);
        });
    });
    console.log('listeners de remocao carregados')
}

function configurarListenersQuantidade() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', async () => {
            const itemId = input.getAttribute('data-id');
            const novaQuantidade = input.value;
            await atualizarQuantidade(itemId, novaQuantidade);
        });
    });
    console.log('Listeners de quantidade carregados');
}

function configurarListenersFinalizarCarrinho() {
    const finalizarCarrinhoBtn = document.getElementById('finalizar-carrinho');

    finalizarCarrinhoBtn.addEventListener('click', function () {
        // Redireciona para a página de login
        window.location.href = 'login.html';
    });

    console.log('Listener de finalizar carrinho carregado');
}


function scrollEsq(index) {
    const containers = document.querySelectorAll('.card-container');
    if (containers[index]) {
        containers[index].scrollBy({ left: -200, behavior: 'smooth' });
    }
}

function scrollDir(index) {
    const containers = document.querySelectorAll('.card-container');
    if (containers[index]) {
        containers[index].scrollBy({ left: 200, behavior: 'smooth' });
    }
}

// Função para trocar a imagem principal
function changeImage(src) {
    document.getElementById('mainImage').src = src;
}


async function buscarDadosProduto(id) {
    try {
        const response = await fetch('./json/tabuleiro.json');
        const data = await response.json();
        return data.produtos.find(produto => produto.id == id);
    } catch (error) {
        console.error("Erro ao buscar os dados do produto:", error);
    }
}

async function adicionarAoCarrinho(id) {
    console.log(id);
    const produto = await buscarDadosProduto(id);
    console.log('Produto encontrado:', produto);

    if (produto) {
        let carrinho = await obterDadosDoLocalStorage('carrinho');
        console.log('Carrinho antes da adição:', carrinho);

        // Atualiza o carrinho com a quantidade correta
        const itemExistente = carrinho.find(item => item.id === Number(id));
        console.log('Item existente no carrinho:', itemExistente);

        if (itemExistente) {
            itemExistente.quantidade += 1;
            console.log('Item atualizado:', itemExistente);
        } else {
            const novoItem = {
                id: produto.id,
                titulo: produto.nome,
                preco: parseFloat(produto.preco),
                imagem: produto.imagem_principal,
                quantidade: 1
            };
            carrinho.push(novoItem);
            console.log('Novo item adicionado:', novoItem);
        }

        // Atualiza o localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        showToast(produto.nome, produto.imagem_principal);
    } else {
        console.error('Produto não encontrado');
    }
}

async function obterDadosDoLocalStorage(chave) {
    const dados = localStorage.getItem(chave);
    console.log('Dados obtidos do localStorage:', dados);

    if (dados) {
        try {
            const parsedDados = JSON.parse(dados);
            console.log('Dados parseados:', parsedDados);
            return parsedDados;
        } catch (error) {
            console.error('Erro ao parsear dados do localStorage:', error);
            return [];
        }
    } else {
        console.log('Nenhum dado encontrado para a chave:', chave);
        return [];
    }
}

async function popularCarrinho() {
    const itensCarrinho = await obterDadosDoLocalStorage('carrinho');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const subtotalElement = document.getElementById('subtotal');
    const freteElement = document.getElementById('frete');
    const totalElement = document.getElementById('total');
    let subtotal = 0;

    carrinhoItensContainer.innerHTML = '';

    itensCarrinho.forEach(item => {
        const subtotalItem = item.preco * item.quantidade;
        subtotal += subtotalItem;

        const itemElement = document.createElement('tr');
        itemElement.innerHTML = `
            <td class="trash trash2"><img src="${item.imagem}" alt="${item.titulo}" class="img-thumbnail trash2 img-tabela" style="height: 50px;"></td>
            <td>${item.titulo}</td>
            <td>
                <input type="number" value="${item.quantidade}" class="form-control" style="width: 60px;" min="0" data-id="${item.id}">
            </td>
            <td>R$ ${subtotalItem.toFixed(2)}</td>
            <td class="text-center trash">
                <button class="btn remover-item btn-bd-primary" data-id="${item.id}" aria-label="Remover item">
                    <i data-feather="trash-2"></i>
                </button>
            </td>
        `;
        carrinhoItensContainer.appendChild(itemElement);

        feather.replace();
        configurarListenersRemover();
        configurarListenersQuantidade();

    });

    const frete = 30; // Valor fixo do frete
    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    freteElement.textContent = `R$ ${frete.toFixed(2)}`;
    totalElement.textContent = `R$ ${(subtotal + frete).toFixed(2)}`;
}

async function removerItemDoCarrinho(itemId) {
    let carrinho = await obterDadosDoLocalStorage('carrinho');
    carrinho = carrinho.filter(item => item.id !== Number(itemId));
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    popularCarrinho();
}

async function atualizarQuantidade(itemId, novaQuantidade) {
    let carrinho = await obterDadosDoLocalStorage('carrinho');

    // Atualiza a quantidade ou remove o item se a quantidade for zero ou menor
    carrinho = carrinho.filter(item => {
        if (item.id === Number(itemId)) {
            if (parseInt(novaQuantidade) <= 0) {
                return false;
            }
            item.quantidade = parseInt(novaQuantidade);
        }
        return true;
    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    popularCarrinho();
}

document.addEventListener("DOMContentLoaded", async function () {
    // Detectar a página atual
    const currentPage = document.body.getAttribute('data-page');

    // Inserir Navbar e Footer, que são comuns a todas as páginas
    document.getElementById("navbar-container").innerHTML = createNavbar();
    document.getElementById("footer-container").innerHTML = createFooter();


    // Condicional para a página inicial (index.html)
    if (currentPage === 'index') {
        const { createCarousel } = await import('./componentes/carousel.js');

        // Inserir o Carousel específico para a página inicial
        document.getElementById("carousel-container").innerHTML = createCarousel();

        fetch('./json/tabuleiro.json')
            .then(response => response.json())
            .then(data => {
                const jogosContainer = document.getElementById("jogos-container");
                const acessoriosContainer = document.getElementById("acessorios-container");

                data.produtos.forEach(produto => {
                    const card = createCard(
                        produto.id,
                        produto.imagem_principal,
                        produto.nome,
                        produto.preco,
                        produto.descricao
                    );
                    if (produto.categoria === "Jogos de Tabuleiro") {
                        jogosContainer.innerHTML += card;
                    } else if (produto.categoria === "Acessórios") {
                        acessoriosContainer.innerHTML += card;
                    }
                });

                // Atualiza os ícones
                feather.replace();
                configurarListeners();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));

        // Atualiza os ícones
        feather.replace();

        // Adicionar event listeners aos botões de scroll
        document.querySelectorAll('.scroll-control.left-control').forEach((button, index) => {
            button.addEventListener('click', () => scrollEsq(index));
        });

        document.querySelectorAll('.scroll-control.right-control').forEach((button, index) => {
            button.addEventListener('click', () => scrollDir(index));
        });

    }
    // Condicional para a página de jogos de tabuleiro (jogost.html)
    else if (currentPage === 'jogost') {
        fetch('./json/tabuleiro.json')
            .then(response => response.json())
            .then(data => {
                const jogosContainer = document.getElementById("jogos-container");

                data.produtos.forEach(produto => {
                    const card = createCard(
                        produto.id,
                        produto.imagem_principal,
                        produto.nome,
                        produto.preco,
                        produto.descricao
                    );
                    if (produto.categoria === "Jogos de Tabuleiro") {
                        jogosContainer.innerHTML += card;
                    }
                });

                // Atualiza os ícones
                feather.replace();
                configurarListeners();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));
    }
    // Condicional para a página de jogos de cartas (jogosc.html)
    else if (currentPage === 'jogosc') {
        fetch('./json/tabuleiro.json')
            .then(response => response.json())
            .then(data => {
                const cardgamesContainer = document.getElementById("cardgames-container");

                data.produtos.forEach(produto => {
                    const card = createCard(
                        produto.id,
                        produto.imagem_principal,
                        produto.nome,
                        produto.preco,
                        produto.descricao
                    );
                    if (produto.categoria === "Card Games") {
                        cardgamesContainer.innerHTML += card;
                    }
                });

                // Atualiza os ícones
                feather.replace();
                configurarListeners();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));


    }
    // Condicional para a página de acessórios (acessorios.html)
    else if (currentPage === 'acessorios') {
        fetch('./json/tabuleiro.json')
            .then(response => response.json())
            .then(data => {
                const acessoriosContainer = document.getElementById("acessorios-container");

                data.produtos.forEach(produto => {
                    const card = createCard(
                        produto.id,
                        produto.imagem_principal,
                        produto.nome,
                        produto.preco,
                        produto.descricao
                    );
                    if (produto.categoria === "Acessórios") {
                        acessoriosContainer.innerHTML += card;
                    }
                });
                // Atualiza os ícones
                feather.replace();
                configurarListeners();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));



    }
    else if (currentPage === 'cadastro') {
        const { createForm, validaForm } = await import('./componentes/cadastro.js');

        // Inserir o formulário na div com o ID form-container
        document.getElementById("form-container").innerHTML = createForm();
        feather.replace();

        // Adicionar a validação ao formulário carregado
        validaForm();
    }
    else if (currentPage === 'login') {
        feather.replace();


    }
    // Condicional para a página de carrinho (carrinho.html)
    else if (currentPage === 'carrinho') {
        popularCarrinho();
        configurarListenersFinalizarCarrinho();
        feather.replace();


    }
    // Condicional para a página de produto individual (produto.html)
    else if (currentPage === 'produto') {
        const params = new URLSearchParams(window.location.search);
        const produtoId = parseInt(params.get('id'), 10); // Obtém o ID da URL


        if (isNaN(produtoId)) {
            console.error('ID do produto não especificado ou inválido.');
            return;
        }

        try {
            const response = await fetch('./json/tabuleiro.json');
            const data = await response.json();
            const produto = data.produtos.find(item => item.id === produtoId);

            if (produto) {

                if (produto.categoria === "Jogos de Tabuleiro") {
                    document.getElementById('categoria').innerHTML = `<a href="jogost.html">Jogos de tabuleiro</a>`;
                }
                else if (produto.categoria === "Card Games") {
                    document.getElementById('categoria').innerHTML = `<a href="jogosc.html">Card Games</a>`;
                }
                else if (produto.categoria === "Acessórios") {
                    document.getElementById('categoria').innerHTML = `<a href="acessorios.html">Acessórios</a>`;
                }

                document.getElementById('itematual').textContent = produto.nome

                // Atualiza a imagem principal
                document.getElementById('mainImage').src = produto.imagem_principal;
                document.getElementById('mainImage').alt = produto.nome;

                // Atualiza a mini galeria
                const miniGallery = document.getElementById('miniGallery');
                const imgElement = document.createElement('img');
                imgElement.src = produto.imagem_principal;
                imgElement.className = 'img-fluid img-thumbnail mini-image ms-2';
                imgElement.onclick = () => changeImage(produto.imagem_principal); // Adiciona função de clique
                miniGallery.appendChild(imgElement);
                produto.outras_imagens.forEach(imagem => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagem;
                    imgElement.className = 'img-fluid img-thumbnail mini-image ms-2';
                    imgElement.onclick = () => changeImage(imagem); // Adiciona função de clique
                    miniGallery.appendChild(imgElement);
                });

                // Atualiza os outros detalhes do produto
                document.getElementById('nome').textContent = produto.nome;
                document.getElementById('preco').innerHTML = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;
                document.getElementById('descricao').textContent = produto.descricao;
                document.getElementById('botao').innerHTML = `<button class="btn btn-bd-primary addcarrinho w-100" data-id="${produto.id}">
                            <i data-feather="shopping-cart"></i> Adicionar ao Carrinho
                        </button>`
                if (produto.categoria === 'Acessórios') {
                    // Oculta a seção de detalhes do produto se for um acessório
                    const detalhesSection = document.querySelector('.detelhes');
                    detalhesSection.style.display = 'none';
                } else {
                    // Exibe os detalhes do produto para outras categorias
                    document.getElementById('editor').textContent = produto.editor || 'Não especificado';

                    const mecanicas = produto.mecanicas ?
                        (typeof produto.mecanicas === 'string' ? produto.mecanicas.replace(/,/g, ', ') : produto.mecanicas.join(', ')) :
                        'Não especificado';
                    document.getElementById('mecanicas').textContent = mecanicas;

                    document.getElementById('quantidade_jogadores').textContent = produto.quantidade_jogadores || 'Não especificado';
                    document.getElementById('duracao').textContent = produto.duracao || 'Não especificado';
                    document.getElementById('idade_recomendada').textContent = produto.idade_recomendada || 'Não especificado';
                }
            } else {
                console.error('Produto não encontrado.');
            }

            // Atualiza os ícones
            feather.replace();
        } catch (error) {
            console.error('Erro ao carregar o produto:', error);
        }
    }

    // Condicional para a página de promoções (promo.html)
    else if (currentPage === 'promo') {
        fetch('./json/tabuleiro.json')
            .then(response => response.json())
            .then(data => {
                const promoContainer = document.getElementById("promo-container");

                data.produtos.forEach(produto => {
                    const card = createCard(
                        produto.id,
                        produto.imagem_principal,
                        produto.nome,
                        produto.preco,
                        produto.descricao
                    );
                    if (produto.promo === "sim") {
                        promoContainer.innerHTML += card;
                    }
                });
                // Atualiza os ícones
                feather.replace();
                configurarListeners();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));
    }
    //listener para os botoes do carrinho
    document.querySelectorAll('.addcarrinho').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            await adicionarAoCarrinho(id);
        });
    });
});



