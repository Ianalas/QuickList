const form = document.querySelector("form");
const input = document.querySelector("input");
const listaDeItens = document.getElementsByClassName("list")[0];
const allRemoveBtn = document.querySelector("#RemoverTudo");

form.onsubmit = (e) => {
  e.preventDefault();

  let text = input.value;

  if (text.trim() === "") { //verifica se não é um valor vazio
    alert("Por favor, insira um texto válido.");
    return;
  }

  let itemList = document.createElement("li");
  itemList.classList.add("item");

  let paragraph = document.createElement("p");
  paragraph.textContent = text;

  let icon = document.createElement("i");
  icon.setAttribute("data-lucide", "trash-2");
  icon.classList.add("delete");

  itemList.append(paragraph, icon);
  listaDeItens.appendChild(itemList);

  // Atualiza os ícones do Lucide
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }

  input.value = "";
  input.focus();
};

listaDeItens.addEventListener('click', (e) => {
  e.preventDefault();

  try {

    //Toggle de checkado ou não para remover os selecionados
    let checkParagraph = listaDeItens.querySelectorAll("li p");
    for (let k = 0; k < checkParagraph.length; k++) { 
      if (checkParagraph[k] == e.target) {
        e.target.classList.toggle("checkado");
      }
    }

    if (e.target.classList.contains("delete")) {
      let item = e.target.closest(".item");

      item.remove();
      sendMessage("O item foi removido da sua Lista");
      if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons();
      }
    }
  } catch (error) {
    alert("Erro ao remover o item.");
    console.error(error);
  }
});

function sendMessage(msg) {
  let box = document.createElement("div");
  box.classList.add("message");

  let p = document.createElement("p");
  p.innerHTML = `<i data-lucide="megaphone" class="delete"></i> ${msg}`;

  let icon = document.createElement("i");
  icon.setAttribute("data-lucide", "x");

  box.append(p, icon);
  listaDeItens.insertAdjacentElement('afterend', box);

  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }

  setTimeout(() => {
    box.remove();
  }, 5000);
}

allRemoveBtn.addEventListener('click', ()=>{
  try {
    let items = listaDeItens.querySelectorAll("li p");

    if(items.length > 0){
      sendMessage(`${ items.length == 1 ?"O item selecionado foi removido" : "Os itens selecionados foram removidos"}`);
    }

    for (let i = 0; i < items.length; i++) {
      let element = items[i];
        if(element.classList.contains("checkado")){
          let paiElement = element.parentElement
          paiElement.remove();
        }
    }
  } catch (error) {
    alert("Não foi possível remover os selecionados");
    console.log(error);
  }
})
