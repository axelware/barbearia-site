let carrinho = [];

function adicionar(servico, preco) {
  carrinho.push({ servico, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total');
  const btn = document.getElementById('btnConfirmar');
  lista.innerHTML = '';

  if (carrinho.length === 0) {
    total.textContent = 'Nenhum serviço selecionado.';
    btn.style.display = 'none';
    return;
  }

  let totalValor = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.servico} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    totalValor += item.preco;
  });

  total.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
  btn.style.display = 'flex';
}

function confirmar() {
  const nome = document.getElementById('nome').value.trim();
  const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
  const dia = document.getElementById('dia').value;
  const horario = document.getElementById('horario').value;

  if (!nome || !telefoneCliente || !dia || !horario) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const itens = carrinho.map(item => `${item.servico} (R$ ${item.preco})`).join(', ');
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const msg = `Olá, meu nome é *${nome}* (${telefoneCliente}) e gostaria de agendar:\n\n📋 *Serviços:* ${itens}\n💵 *Total:* R$ ${total.toFixed(2)}\n🕒 *Horário desejado:* ${dia} às ${horario}`;

  const telefoneBarbeiro = "5513981558503"; // SEM + ou espaços
  const url = `https://wa.me/${telefoneBarbeiro}?text=${encodeURIComponent(msg)}`;

  // Redireciona diretamente (sem usar window.open)
  window.location.href = url;
}
