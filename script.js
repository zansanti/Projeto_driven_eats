// Função para verificar se um item de cada categoria foi selecionado
function verificarSelecao() {
    var pratosSelecionados = document.querySelectorAll('.categoria-pratos .prato.selecionado').length;
    var bebidasSelecionadas = document.querySelectorAll('.categoria-bebidas .prato.selecionado').length;
    var sobremesasSelecionadas = document.querySelectorAll('.categoria-sobremesas .prato.selecionado').length;
  
    // Verifica se um item de cada categoria foi selecionado
    if (pratosSelecionados > 0 && bebidasSelecionadas > 0 && sobremesasSelecionadas > 0) {
      var botaoFecharPedido = document.getElementById('botao_fechar_pedido');
      botaoFecharPedido.innerHTML = 'Fechar pedido';
      botaoFecharPedido.style.backgroundColor = '#32B72F';
      botaoFecharPedido.classList.add('selecionado');
      // Adiciona o event listener apenas quando todos os itens estão selecionados
      botaoFecharPedido.addEventListener('click', mostrarDetalhesPedido);
    } else {
      var botaoFecharPedido = document.getElementById('botao_fechar_pedido');
      botaoFecharPedido.innerHTML = 'Selecione os 3 itens <br>para fechar seu pedido';
      botaoFecharPedido.style.backgroundColor = '#CBCBCB';
      botaoFecharPedido.classList.remove('selecionado');
      // Remove o event listener quando nem todos os itens estão selecionados
      botaoFecharPedido.removeEventListener('click', mostrarDetalhesPedido);
    }
  }
  
// Função chamada ao selecionar um prato, bebida ou sobremesa
function selecionarItem(item) {
    var estaSelecionado = item.classList.contains("selecionado");
  
    var categoria = item.closest('.refeicoes');
    var itens = categoria.querySelectorAll('.prato');
    itens.forEach(function(item) {
      item.classList.remove('selecionado');
      item.querySelector('.check_escondido').style.display = 'none';
    });
  
    if (!estaSelecionado) {
      item.classList.add("selecionado");
      var checkIcon = item.querySelector('.check_escondido');
      if (checkIcon) {
        checkIcon.style.display = 'block';
      }
    }
  
    verificarSelecao(); // Verifica se um item de cada categoria foi selecionado após cada seleção
  }
  
  // Função para mostrar o overlay e a tela de detalhes do pedido
function mostrarDetalhesPedido() {
  var botaoFecharPedido = document.getElementById('botao_fechar_pedido');
  if (botaoFecharPedido.classList.contains('selecionado')) {
    var overlay = document.querySelector('.overlay');
    var detalhesPedido = document.querySelector('.pedido-detalhes');

    // Limpa o conteúdo atual dos detalhes do pedido
    detalhesPedido.innerHTML = '';

    // Arrays para armazenar os itens selecionados de cada categoria
    var pratoSelecionado = '';
    var bebidaSelecionada = '';
    var sobremesaSelecionada = '';
    var pratoPreco = 0;
    var bebidaPreco = 0;
    var sobremesaPreco = 0;

    // Obtém o prato selecionado e seu preço
    var pratosSelecionados = document.querySelectorAll('.categoria-pratos .prato.selecionado');
    if (pratosSelecionados.length > 0) {
      pratoSelecionado = pratosSelecionados[0].querySelector('.titulo_prato').textContent.trim();
      pratoPreco = parseFloat(pratosSelecionados[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
    }

    // Obtém a bebida selecionada e seu preço
    var bebidasSelecionadas = document.querySelectorAll('.categoria-bebidas .prato.selecionado');
    if (bebidasSelecionadas.length > 0) {
      bebidaSelecionada = bebidasSelecionadas[0].querySelector('.titulo_prato').textContent.trim();
      bebidaPreco = parseFloat(bebidasSelecionadas[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
    }

    // Obtém a sobremesa selecionada e seu preço
    var sobremesasSelecionadas = document.querySelectorAll('.categoria-sobremesas .prato.selecionado');
    if (sobremesasSelecionadas.length > 0) {
      sobremesaSelecionada = sobremesasSelecionadas[0].querySelector('.titulo_prato').textContent.trim();
      sobremesaPreco = parseFloat(sobremesasSelecionadas[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
    }

    // Calcula o total do pedido
    var totalPedido = pratoPreco + bebidaPreco + sobremesaPreco;

    // Formata o total para duas casas decimais
    totalPedido = totalPedido.toFixed(2);

    // Monta o conteúdo dos detalhes do pedido com os itens selecionados e seus preços
    detalhesPedido.innerHTML = `
      <h2>Detalhes do Pedido</h2>
      <p>Item: ${pratoSelecionado} - ${pratoPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Bebida: ${bebidaSelecionada} - ${bebidaPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Sobremesa: ${sobremesaSelecionada} - ${sobremesaPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Total do Pedido: ${totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <div class="botoes-detalhes">
        <button id="confirmar-pedido" class="botao-detalhe">Tudo certo. Pode pedir!</button>
        <button id="cancelar-pedido" class="botao-detalhe">Cancelar</button>
      </div>
    `;

    // Adiciona event listeners aos botões dentro dos detalhes do pedido
    detalhesPedido.querySelector('#confirmar-pedido').addEventListener('click', confirmarPedido);
    detalhesPedido.querySelector('#cancelar-pedido').addEventListener('click', cancelarPedido);

    // Mostra o overlay e a tela de detalhes do pedido
    overlay.style.display = 'block';
    detalhesPedido.style.display = 'block';
  }
}
  
  // Função para fechar a tela de detalhes do pedido
  function fecharDetalhesPedido() {
    var overlay = document.querySelector('.overlay');
    var detalhesPedido = document.querySelector('.pedido-detalhes');
  
    // Esconde o overlay e a tela de detalhes do pedido
    overlay.style.display = 'none';
    detalhesPedido.style.display = 'none';
  }
  
  // Função para confirmar o pedido
  function confirmarPedido() {
    enviarPedidoWhatsApp() 

  }
  
  // Função para cancelar o pedido
  function cancelarPedido() {
    fecharDetalhesPedido();
  }
  
  // Event listener para fechar o pedido ao clicar no botão
  document.getElementById('botao_fechar_pedido').addEventListener('click', mostrarDetalhesPedido);
  
  // Event listener para fechar a tela de detalhes do pedido ao clicar no overlay
  document.querySelector('.overlay').addEventListener('click', fecharDetalhesPedido);
  
  // Event listener para selecionar um prato ao clicar nele
  var pratos = document.querySelectorAll('.categoria-pratos .prato');
  pratos.forEach(function(prato) {
    prato.addEventListener('click', function() {
      selecionarItem(prato);
    });
  });
  
  // Event listener para selecionar uma bebida ao clicar nela
  var bebidas = document.querySelectorAll('.categoria-bebidas .prato');
  bebidas.forEach(function(bebida) {
    bebida.addEventListener('click', function() {
      selecionarItem(bebida);
    });
  });
  
  // Event listener para selecionar uma sobremesa ao clicar nela
  var sobremesas = document.querySelectorAll('.categoria-sobremesas .prato');
  sobremesas.forEach(function(sobremesa) {
    sobremesa.addEventListener('click', function() {
      selecionarItem(sobremesa);
    });
  });
  // Função para enviar mensagem via WhatsApp com os detalhes do pedido
function enviarPedidoWhatsApp() {
  // Detalhes do pedido
  var pratoSelecionado = '';
  var bebidaSelecionada = '';
  var sobremesaSelecionada = '';
  var totalPedido = 0;

  // Obtém o prato selecionado e seu preço
  var pratosSelecionados = document.querySelectorAll('.categoria-pratos .prato.selecionado');
  if (pratosSelecionados.length > 0) {
    pratoSelecionado = pratosSelecionados[0].querySelector('.titulo_prato').textContent.trim();
    totalPedido += parseFloat(pratosSelecionados[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
  }

  // Obtém a bebida selecionada e seu preço
  var bebidasSelecionadas = document.querySelectorAll('.categoria-bebidas .prato.selecionado');
  if (bebidasSelecionadas.length > 0) {
    bebidaSelecionada = bebidasSelecionadas[0].querySelector('.titulo_prato').textContent.trim();
    totalPedido += parseFloat(bebidasSelecionadas[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
  }

  // Obtém a sobremesa selecionada e seu preço
  var sobremesasSelecionadas = document.querySelectorAll('.categoria-sobremesas .prato.selecionado');
  if (sobremesasSelecionadas.length > 0) {
    sobremesaSelecionada = sobremesasSelecionadas[0].querySelector('.titulo_prato').textContent.trim();
    totalPedido += parseFloat(sobremesasSelecionadas[0].querySelector('.preco_prato').textContent.trim().replace('R$ ', '').replace(',', '.'));
  }

  // Formata o total para duas casas decimais
  totalPedido = totalPedido.toFixed(2);

  // Número de telefone para o WhatsApp
  var numeroWhatsApp = '5541985153577';

  // Monta a mensagem com os detalhes do pedido
  var mensagem = `Olá, gostaria de fazer o pedido:\n\n`;
  mensagem += `- Prato: ${pratoSelecionado}\n`;
  mensagem += `- Bebida: ${bebidaSelecionada}\n`;
  mensagem += `- Sobremesa: ${sobremesaSelecionada}\n`;
  mensagem += `Total: R$ ${totalPedido}\n`;

  // Codifica a mensagem para ser usada na URL do WhatsApp
  var mensagemEncoded = encodeURIComponent(mensagem);

  // URL para o redirecionamento para o WhatsApp
  var url = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`;

  // Redireciona para o WhatsApp
  window.open(url, '_blank');
}

// Event listener para enviar o pedido via WhatsApp ao clicar em 'Tudo certo. Pode pedir!'
document.getElementById('confirmar-pedido').addEventListener('click', function() {
  enviarPedidoWhatsApp();
});