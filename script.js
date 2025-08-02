// script.js
const addButtons = document.querySelectorAll('.add-btn');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const confirmBtn = document.getElementById('confirm-btn');

const nomeInput = document.getElementById('nome');
const diaInput = document.getElementById('dia');
const horaInput = document.getElementById('hora');

let cart = [];

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
      validarCampos();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
  validarCampos();
}

function validarCampos() {
  const nomeValido = nomeInput.value.trim().length >= 3;
  const diaValido = diaInput.value !== '';
  const horaValido = horaInput.value !== '';
  const temItens = cart.length > 0;

  confirmBtn.disabled = !(nomeValido && diaValido && horaValido && temItens);
}

addButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const serviceDiv = e.target.closest('.service');
    const name = serviceDiv.getAttribute('data-name');
    const price = parseFloat(serviceDiv.getAttribute('data-price'));

    const existe = cart.find(item => item.name === name);
    if (!existe) {
      cart.push({ name, price });
    }

    updateCart();
  });
});

confirmBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  const nome = nomeInput.value.trim();
  const dia = diaInput.value;
  const hora = horaInput.value;

  const mensagemServicos = cart
    .map(item => `- ${item.name} (R$ ${item.price.toFixed(2)})`)
    .join('\n');

  const total = cart.reduce((acc, cur) => acc + cur.price, 0);

  const mensagem = `Olá, meu nome é ${nome}.\nGostaria de agendar os seguintes serviços:\n\n${mensagemServicos}\nTotal: R$ ${total.toFixed(2)}\nDia: ${dia}\nHorário: ${hora}`;

  const whatsappNumber = '5513981558503';
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');

  cart = [];
  nomeInput.value = '';
  diaInput.value = '';
  horaInput.value = '';
  updateCart();
});
