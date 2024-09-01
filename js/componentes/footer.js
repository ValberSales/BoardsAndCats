// footer.js
export function createFooter() {
    return `
    <div class="footer-content flex flexColumn">
      <div class="grow1">
        <h4 class="foot">Institucional</h4>
        <ul>
          <li><a href="">Quem somos</a></li>
          <li><a href="">Onde estamos</a></li>
          <li><a href="">Fale conosco</a></li>
        </ul>

      </div>
      <div class="grow1">
        <h4 class="foot">Minha conta</h4>

        <ul>
          <li><a href="">Meu cadastro</a></li>
          <li><a href="">Meus pedidos</a></li>
          <li><a href="">Minhas formas de pagamento</a></li>
        </ul>


      </div>
      <div class="footericons">
        <h4 class="foot">Redes sociais</h4>
        <ul>
          <li><a href="https://www.instagram.com" target="_blank" title="Instagram"><i data-feather="instagram"></i></a>
          </li>
          <li><a href="https://twitter.com" target="_blank" title="X"><i data-feather="twitter"></i></a></li>
          <li><a href="https://wa.me" target="_blank" title="WhatsApp"><i data-feather="message-circle"></i></a></li>
        </ul>
        <div>
            <img class="cardicons" src="./img/cards.jpg" alt="">    
        </div>


      </div>

    </div>
    <div class="direitos-autorais">
      <p>Copyright - Boards and Cats 2024</p>
      <p>CNPJ: 36.550.886/0001-94</p>
    </div>
    `;
}