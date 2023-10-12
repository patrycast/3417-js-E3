const listaDePizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Ananá",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Ananá"],
    imagen: "./img/anana.png",
  },
];

const pizzasJSON = JSON.stringify(listaDePizzas);
localStorage.setItem("pizzas", pizzasJSON);

const boton = document.getElementById('boton');
const container = document.getElementById("container");
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
input = document.getElementById("input-id");

const ultimaPizzaEncontradaJSON = localStorage.getItem('ultimaPizzaEncontrada');
const ultimaPizzaEncontrada = ultimaPizzaEncontradaJSON ? JSON.parse(ultimaPizzaEncontradaJSON) : null;

let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

console.log(pizzas);

const saveLocalStorage = () => {
  localStorage.setItem('pizzas', JSON.stringify(pizzas));
};

const renderPizzas = () => {
  container.innerHTML = pizzas.map((pizza) => addPizza(pizza)).join('');
};

const addPizza = (e) => {
  const pizzaId = parseInt(input.value.trim());

  if (Number.isInteger(pizzaId) && pizzaId > 0) {
    const pizzaEncontrada = pizzas.find((pizza) => pizza.id === pizzaId);

    if (pizzaEncontrada) {
      localStorage.setItem('ultimaPizzaEncontrada', JSON.stringify(pizzaEncontrada));

      container.innerHTML = `<div class="card">
        <h2>${pizzaEncontrada.nombre}</h2>
        <p>Precio: $${pizzaEncontrada.precio}</p>
        <img src="${pizzaEncontrada.imagen}" alt="${pizzaEncontrada.nombre}">
      </div>`;
      
      input.value = '';
    } else {
      container.innerHTML = '<p>No se encontró una pizza con el ID especificado.</p>';
      input.value = '';
    }
  } else {
    container.innerHTML = '<p>Ingrese un número de ID válido.</p>'; 
    input.value = '';
  }
}

pizzas = [...pizzas];

const init = () => {
  boton.addEventListener('click', addPizza);
  renderPizzas();
  saveLocalStorage();
  if (ultimaPizzaEncontrada) {
    container.innerHTML = `<div class="card">
      <h2>${ultimaPizzaEncontrada.nombre}</h2>
      <p>Precio: $${ultimaPizzaEncontrada.precio}</p>
      <img src="${ultimaPizzaEncontrada.imagen}" alt="${ultimaPizzaEncontrada.nombre}">
    </div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
