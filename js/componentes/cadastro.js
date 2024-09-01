export function createForm() {
    return `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Cadastro de Usuário</h3>
              <form id="form-cadastro" class="px-4 py-3">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="nomeCompleto" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" id="nomeCompleto" required>
                  </div>
                  <div class="col-md-6">
                    <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                    <input type="date" class="form-control" id="dataNascimento" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="endereco" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="endereco" required>
                  </div>
                  <div class="col-md-3">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="cidade" required>
                  </div>
                  <div class="col-md-3">
                    <label for="estado" class="form-label">Estado</label>
                    <select class="form-select" id="estado" required>
                      <option value="" disabled selected>Selecione</option>
                      <!-- Lista de estados -->
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="telefone" class="form-label">Telefone de Contato</label>
                    <input type="text" class="form-control" id="telefone" required>
                  </div>
                  <div class="col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="receberPromocoes">
                  <label class="form-check-label" for="receberPromocoes">Desejo receber promoções</label>
                </div>
                <button type="submit" class="btn btn-carrinho w-100">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

export function validaForm() {
    const form = document.getElementById('form-cadastro');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário até que a validação seja feita
            
            // Validação dos campos
            const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
            const dataNascimento = document.getElementById('dataNascimento').value.trim();
            const endereco = document.getElementById('endereco').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            const estado = document.getElementById('estado').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!nomeCompleto || !dataNascimento || !endereco || !cidade || !estado || !telefone || !email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (!validaEmail(email)) {
                alert('O email fornecido é inválido.');
                return;
            }

            // Cria um objeto com os dados do formulário
            const formData = {
                nomeCompleto,
                dataNascimento,
                endereco,
                cidade,
                estado,
                telefone,
                email,
                receberPromocoes
            };

            // Salva os dados no localStorage
            localStorage.setItem('formData', JSON.stringify(formData));

            alert('Cadastro realizado com sucesso!')
            form.submit();
        });
    }
}

function validaEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
