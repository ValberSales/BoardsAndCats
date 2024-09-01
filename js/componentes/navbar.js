// navbar.js
export function createNavbar() {
  return `
    <nav class="navbar navbar-expand-md p-1 nav sombra bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html"><img src="./img/logo.webp" class="logo" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto gap-3 listalinks ms-auto mb-2 mb-lg-0">
        <li class="nav-item txt-center">
          <a class="nav-link p-0" aria-current="page" href="index.html"><img src="./img/happy.png" alt="Início"></a>
          <a class="nav-link" aria-current="page" href="index.html">Início</a>
        </li>
        <li class="nav-item txt-center">
          <a class="nav-link p-0" href="jogost.html"><img src="./img/table-games.png" alt="Jogos de tabuleiro"></a>
          <a class="nav-link" href="jogost.html">Jogos de tabuleiro</a>
        </li>
        <li class="nav-item txt-center">
          <a class="nav-link p-0" href="jogosc.html"><img src="./img/poker-game.png" alt="Card Games"></a>
          <a class="nav-link" href="jogosc.html">Card Games</a>
        </li>
        <li class="nav-item txt-center">
          <a class="nav-link p-0" href="acessorios.html"><img src="./img/dices.png" alt="Acessórios"></a>
          <a class="nav-link" href="acessorios.html">Acessórios</a>
        </li>
        <li class="nav-item txt-center">
          <a class="nav-link p-0" href="promo.html"><img src="./img/promo-code.png" alt="Promoções"></a>
          <a class="nav-link" href="promo.html">Promoções</a>
        </li>
      </ul>

      <div class="d-flex align-items-center gap-3">

        <div class="navbar-nav">
          <a class="nav-link" href="carrinho.html">
            <i data-feather="shopping-cart"></i>
          </a>
        </div>

        <div class="dropdown navbar-nav">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i data-feather="search"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-end p-3" style="min-width: 250px;">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Ex: Azul" aria-label="Search">
              <button class="btn btn-bd-primary" type="submit">Buscar</button>
            </form>
          </div>
        </div>

        <div class="navbar-nav linlresp">
          <a class="nav-link" href="login.html">
            <i data-feather="user"></i>
          </a>
        </div>

        <div class="dropdown userdropdown navbar-nav" id="user-dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i data-feather="user"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <form class="px-4 py-3">
              <div class="mb-3">
                <label for="exampleDropdownFormEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@examplo.com">
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label">Senha</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Senha">
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="dropdownCheck">
                  <label class="form-check-label" for="dropdownCheck">Lembrar login</label>
                </div>
              </div>
              <button type="submit" class="btn btn-bd-primary">Entrar</button>
            </form>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="cadastro.html">Novo por aqui? Cadastre-se</a>
            <a class="dropdown-item" href="#">Recuperar senha</a>
          </div>
        </div>

      </div>

    </div>
  </div>
</nav>
    `;
}
