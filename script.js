// script.js
const addButtons = document.querySelectorAll('.add-btn');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const confirmBtn = document.getElementById('confirm-btn');

let cart = [];

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    // Botão para remover do carrinho
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
  confirmBtn.disabled = cart.length === 0;
}

addButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const serviceDiv = e.target.closest('.service');
    const name = serviceDiv.getAttribute('data-name');
    const price = parseFloat(serviceDiv.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
  });
});

confirmBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  const message = cart
    .map(item => `${item.name} - R$ ${item.price.toFixed(2)}`)
    .join('\n');
  const total = cart.reduce((acc, cur) => acc + cur.price, 0);
  const whatsappMessage = encodeURIComponent(
    `Olá, gostaria de agendar os seguintes serviços:\n${message}\nTotal: R$ ${total.toFixed(2)}`
  );
  const whatsappNumber = '5513981558503'; // substitua pelo número real
  window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
});
