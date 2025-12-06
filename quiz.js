// URL do seu Apps Script (Web App)
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

let perguntas = [
    // 1 - signo
    {
        tipo: "menu",
        texto: "Qual seu signo?",
        opcoes: [
            "Áries",
            "Touro",
            "Gêmeos",
            "Câncer",
            "Leão",
            "Virgem",
            "Libra",
            "Escorpião",
            "Sagitário",
            "Capricórnio",
            "Aquário",
            "Peixes"
        ]
    },

    // 2 - faixa etária
    {
        tipo: "menu",
        texto: "Qual sua faixa etária?",
        opcoes: [
            "18 a 25",
            "26 a 30",
            "30 a 39",
            "40 a 50",
            "50 a 60",
            "60+"
        ]
    },

    // 3 - situação (estado civil / status)
    {
        tipo: "menu",
        texto: "Qual sua situação atual?",
        opcoes: [
            "Casada",
            "Solteira",
            "Namorando",
            "Noiva",
            "Separada",
            "Viúva",
            "Liberal",
            "Complicado"
        ]
    },

    // 4 - orientação sexual
    {
        tipo: "menu",
        texto: "Qual sua orientação sexual?",
        opcoes: [
            "Hetero",
            "Homo",
            "Bi",
            "Pan"
        ]
    },

    // 5 - número de pessoas
    {
        tipo: "menu",
        texto: "Com quantas pessoas você já teve relações?",
        opcoes: [
            "1 a 5",
            "6 a 10",
            "11 a 15",
            "15 a 20",
            "20 a 25",
            "25 a 30",
            "31+"
        ]
    },

    // 6 a 11 - em branco para editar depois (menu)
    {
        tipo: "menu",
        texto: "Pergunta 6 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 7 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 8 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 9 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 10 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 11 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    }
];

// 12 a 29 - menus com 4 opções fixas
for (let i = 12; i <= 29; i++) {
    perguntas.push({
        tipo: "menu",
        texto: `Pergunta ${i} (editar depois)`,
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
let enviando = false;

function mostrar() {
    const q = perguntas[atual];
    const progressEl = document.getElementById("progress");
    const questionEl = document.getElementById("question-box");
    const optionsEl = document.getElementById("options-box");
    const btnNext = document.getElementById("btn-next");

    if (!progressEl || !questionEl || !optionsEl || !btnNext) {
        console.error("Elementos do quiz não encontrados no HTML.");
        return;
    }

    progressEl.innerText = `Pergunta ${atual + 1} de ${perguntas.length}`;
    questionEl.innerText = q.texto;

    let html = "";

    if (q.tipo === "menu") {
        html = '<select id="sel"><option value="">Selecione...</option>';
        html += q.opcoes.map(o => `<option value="${o}">${o}</option>`).join("");
        html += "</select>";
    }

    optionsEl.innerHTML = html;

    if (atual === perguntas.length - 1) {
        btnNext.innerText = 'Ver meu Resultado!';
    } else {
        btnNext.innerText = 'Próxima';
    }
}

function proxima() {
    if (enviando) return;

    const q = perguntas[atual];
    let resposta = null;

    if (q.tipo === "menu") {
        const sel = document.getElementById("sel");
        if (!sel || !sel.value) { 
            alert("ESCOLHA UMA OPCAO para prosseguir.");
            return;
        }
        resposta = sel.value;
    }

    respostas.push(resposta);
    atual++;

    if (atual < perguntas.length) {
        mostrar();
    } else {
        mudarTelaEnviando("Processando suas respostas...");
        enviarRespostas();
    }
}

async function enviarRespostas() {
    enviando = true;
    
    console.log('📤 Enviando respostas:', respostas);
    
    const formData = new FormData();
    formData.append('respostas', JSON.stringify(respostas));

    try {
        const response = await fetch(WEBAPP_URL, {
            method: 'POST',
            body: formData
        });

        console.log('✅ Resposta recebida:', response.status);
        
        // Tenta ler a resposta
        const resultado = await response.text();
        console.log('📄 Conteúdo da resposta:', resultado);

        // Verifica se teve sucesso
        if (response.ok) {
            mudarTelaEnviando("✅ Respostas enviadas com sucesso! Redirecionando...");
            
            setTimeout(() => {
                // IMPORTANTE: Substitua pela sua página de resultado
                window.location.href = "resultado.html";
            }, 2000);
        } else {
            throw new Error('Erro na resposta do servidor');
        }

    } catch (erro) {
        console.error('❌ Erro ao enviar:', erro);
        mudarTelaEnviando("❌ Erro ao enviar as respostas. Tentando novamente...");
        enviando = false;
        
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}

function mudarTelaEnviando(mensagem) {
    const container = document.getElementById("quiz-container");
    if (container) {
        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2 style="font-size: 24px; margin-bottom: 20px;">${mensagem}</h2>
                <div style="font-size: 50px;">⏳</div>
            </div>
        `;
    }
}

// Inicializa o quiz quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    mostrar();
});
