var mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}

function retrieveSelections() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const isChecked = localStorage.getItem(checkbox.value) === 'true';
    checkbox.checked = isChecked;
  })
}

function clearSelections() {
  localStorage.clear();
}

window.onload = function() {
  retrieveSelections();
  scrollFunction(); // Call scrollFunction on page load to handle initial display of scroll-to-top button
};

function showReceipt() {
  generateReceipt();
  document.querySelector('.floating-receipt').style.display = 'block';
}

function generateReceipt() {
  const receiptItems = document.getElementById('receipt-items');
  const totalBillElement = document.getElementById('total-bill');
  let totalBill = 0;

  receiptItems.innerHTML = '';

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      const dishName = checkbox.value;
      const price = getPriceForDish(dishName);
      totalBill += price;

      const listItem = document.createElement('li');
      listItem.textContent = `${dishName} - ₱${price}`;
      receiptItems.appendChild(listItem);
    }
  });

  totalBillElement.textContent = `Total Bill: ₱${totalBill}`;
}

function getPriceForDish(dishName) {
  switch (dishName) {
    case 'Bulalo':
      return 450;
    case 'Sinigang':
      return 450;
    case 'Kare Kare':
      return 450;
    case 'Adobo':
      return 350;
    case 'Chop Suey':
      return 150;
    case 'Pakbet':
      return 250;
    case 'Laing':
      return 150;
    case 'Ginataang Langka':
      return 150;
    case 'Halo Halo':
      return 150;
    case 'Leche Plan':
      return 500;
    case 'Ice Cream':
      return 50;
    case 'Cake':
      return 150;
    case 'Coffee':
      return 50;
    case 'Tea':
      return 50;
    case 'Juice':
      return 50;
    case 'Soda':
      return 150;
    default:
      return 0;
  }
}

function acknowledgeOrder() {
  clearSelections();
  document.querySelector('.receipt').style.display = 'none';
  location.reload(); // Reload the page
}

function redirectToReceipt() {
  // Redirect to the Receipt.html page
  window.location.href = "Receipt.html";
}

document.getElementById('orderButton').addEventListener('click', showReceipt);
