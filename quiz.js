let perguntas = [
  { tipo: "menu", texto: "Pergunta 1", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },
  { tipo: "menu", texto: "Pergunta 2", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },
  { tipo: "menu", texto: "Pergunta 3", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },
  { tipo: "menu", texto: "Pergunta 4", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },
  { tipo: "menu", texto: "Pergunta 5", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },
  { tipo: "menu", texto: "Pergunta 6", opcoes: ["Opção 1", "Opção 2", "Opção 3"] },

  { tipo: "checkbox", texto: "Pergunta 7", opcoes: ["A","B","C","D"] },
  { tipo: "checkbox", texto: "Pergunta 8", opcoes: ["A","B","C","D"] },
  { tipo: "checkbox", texto: "Pergunta 9", opcoes: ["A","B","C","D"] },
  { tipo: "checkbox", texto: "Pergunta 10", opcoes: ["A","B","C","D"] },
  { tipo: "checkbox", texto: "Pergunta 11", opcoes: ["A","B","C","D"] },
];

for (let i = 12; i <= 29; i++) {
  perguntas.push({
    tipo: "menu",
    texto: `Pergunta ${i}`,
    opcoes: [
      "Nunca fiz e não tenho vontade",
      "Nunca fiz mas tenho curiosidade",
      "Já fiz e não gostei",
      "Já fiz e repetiria com prazer"
    ]
  });
}

let respostas = [];
let atual = 0;

function mostrar() {
  const q = perguntas[atual];
  document.getElementById("progress").innerText =
    `Pergunta ${atual + 1} de ${perguntas.length}`;
  document.getElementById("question-box").innerText = q.texto;

  let html = "";

  if (q.tipo === "menu") {
    html = `
      <select id="sel">
        <option value="">Selecione...</option>
        ${q.opcoes.map(o => `<option value="${o}">${o}</option>`).join("")}
      </select>
    `;
  }

  if (q.tipo === "checkbox") {
    html = q.opcoes
      .map(o => `<label><input type="checkbox" value="${o}"> ${o}</label>`)
      .join("");
  }

  document.getElementById("options-box").innerHTML = html;
}

function proxima() {
  const q = perguntas[atual];

  if (q.tipo === "menu") {
    const v = document.getElementById("sel").value;
    if (!v) return alert("Selecione uma opção");
    respostas.push(v);
  }

  if (q.tipo === "checkbox") {
    const marcados = [...document.querySelectorAll("input[type=checkbox]:checked")].map(e => e.value);
    if (marcados.length === 0) return alert("Selecione ao menos uma");
    respostas.push(marcados);
  }

  atual++;
  if (atual < perguntas.length) {
    mostrar();
  } else {
    document.getElementById("quiz-container").innerHTML =
      "<h2>Finalizado! Respostas salvas no console.</h2>";
    console.log(respostas);
  }
}

mostrar();
