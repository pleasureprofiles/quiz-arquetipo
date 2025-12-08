// URL do seu Apps Script (Web App)
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

let perguntas = [
    // BLOCO 1 - Perfil Básico (1-5)
    {
        tipo: "menu",
        bloco: "Perfil da Deusa",
        texto: "Qual é o seu signo?",
        opcoes: ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"]
    },
    {
        tipo: "menu",
        bloco: "Perfil da Deusa",
        texto: "Qual sua faixa etária?",
        opcoes: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
    },
    {
        tipo: "menu",
        bloco: "Perfil da Deusa",
        texto: "Qual é a sua orientação sexual?",
        opcoes: ["Heterossexual", "Bissexual", "Homossexual", "Pansexual"]
    },
    {
        tipo: "menu",
        bloco: "Perfil da Deusa",
        texto: "Qual seu status de relacionamento?",
        opcoes: ["Solteira", "Namorando", "Noiva", "Casada", "União Estável", "Relacionamento Aberto", "Divorciada", "Viúva", "É complicado"]
    },
    {
        tipo: "menu",
        bloco: "Perfil da Deusa",
        texto: "E o seu 'currículo amoroso'?",
        opcoes: ["0-1", "2-5", "6-10", "11-20", "21-30", "31-50", "51+"]
    },

    // BLOCO 2 - Como se agrada uma Deusa (6-11)
    {
        tipo: "menu",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "Quem prefere que tome a iniciativa na hora H?",
        opcoes: ["Eu", "Ele(s)", "Depende do momento"]
    },
    {
        tipo: "checkbox",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "O que mais faz seu corpo entrar no clima?",
        opcoes: ["Beijos quentes", "Carícias no corpo", "Toque íntimo", "Conversas picantes"]
    },
    {
        tipo: "checkbox",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "Posição preferida?",
        opcoes: ["Cavalgando", "Papai & Mamãe", "De quatro", "Em pé", "69"]
    },
    {
        tipo: "menu",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "Quantos orgasmos conquista na semana?",
        opcoes: ["1", "2–3", "4–6", "Mais de 6"]
    },
    {
        tipo: "menu",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "O tamanho importa? O que essa Deusa prefere?",
        opcoes: ["12 a 15cm", "15 a 18cm", "19 a 21cm", "22cm ou mais"]
    },
    {
        tipo: "checkbox",
        bloco: "🔥 Como se agrada uma Deusa",
        texto: "O que normalmente te leva ao auge do prazer?",
        opcoes: ["Sexo oral", "Penetração", "Estimulação externa com dedos", "Brinquedos", "Estimulação anal", "Vários ao mesmo tempo"]
    },

    // BLOCO 3 - Reflexão da Deusa (12)
    {
        tipo: "checkbox",
        bloco: "🔥🔥 Reflexão da Deusa",
        texto: "Quando a imaginação bate sozinha, o que você recorre a:",
        opcoes: ["Contos eróticos", "Vídeo pornô", "Vibrador", "Brinquedos variados", "Banho estratégico"]
    },

    // BLOCO 4 - A mente de uma Deusa / A caixa preta (13-18)
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Sexo com pessoa do mesmo sexo",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Sexo a três (2 homens com você)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Sexo a três (você, uma amiga e um parceiro)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Sexo com pessoa trans",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Sexo com total desconhecido(a)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Troca de casais / Swing",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥 A mente de uma Deusa",
        texto: "Orgia (mais de 3 pessoas envolvidas)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },

    // BLOCO 5 - Poder e dominação (19-25)
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "O que você prefere, no geral?",
        opcoes: ["Ser dominada", "Dominar"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Inversão de papéis (homem no papel de 'seu escravo', obedecendo às suas ordens)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Algemas / Bondage (ser imobilizada ou imobilizar o outro com algemas, cordas, amarras etc.)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Sado / Dor moderada (tapas, puxões, apertos, pequenos estímulos de dor controlada)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Sado / Dor extrema (situações em que a dor intensa com uso de acessórios é parte central da cena)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Humilhação erótica do parceiro (rebaixar, provocar, xingar o parceiro em contexto sexual consensual)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥 Poder e dominação de uma Deusa",
        texto: "Pegging (usar uma cinta no parceiro, literalmente invertendo o jogo)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },

    // BLOCO 6 - A Caixa Secreta (26)
    {
        tipo: "checkbox",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Em um cenário com você, seu parceiro e outra mulher, qual dessas cenas mais te chama atenção?",
        opcoes: [
            "Beijar e tocar essa mulher enquanto o parceiro assiste",
            "As duas dando atenção pra ele ao mesmo tempo",
            "Você e ela se divertindo mais entre vocês do que com ele",
            "Ele focado em te estimular enquanto você brinca com ela",
            "Revezar: hora você com ele, hora ela com ele, hora só vocês duas"
        ]
    },

    // Continuação do BLOCO 6 (27-33)
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Golden shower (uso de xixi em contexto erótico/humilhação, você faz ou recebe)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "'Traição' com consentimento do parceiro (ficar com outra pessoa com o parceiro sabendo e autorizando)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Cuckold Clássico (você transa com outro homem enquanto o parceiro assiste)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Hotwife e Marido Cuckold (você sai com roupas chamativas e flerta com outros na frente dele)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Hotwife Clássica (você sai com outro e depois conta tudo pro parceiro na cama)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Cuckqueen (você assiste seu parceiro com outra)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Hotwife Indomável (você transa com outro homem e manda seu parceiro interagir com ele)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    },
    {
        tipo: "menu",
        bloco: "🔥🔥🔥🔥🔥 A Caixa Secreta da Deusa",
        texto: "Orgia (homens e mulheres se pegam)",
        opcoes: ["Nunca fiz e não tenho vontade", "Nunca fiz mas tenho curiosidade", "Já fiz e não gostei", "Já fiz e repetiria com prazer"]
    }
];

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

    // Mostra o bloco atual se existir
    let blocoHtml = "";
    if (q.bloco) {
        blocoHtml = `<div style="font-size: 16px; color: #a15cff; margin-bottom: 10px; font-weight: bold;">${q.bloco}</div>`;
    }

    progressEl.innerHTML = `${blocoHtml}Pergunta ${atual + 1} de ${perguntas.length}`;
    questionEl.innerText = q.texto;

    let html = "";

    if (q.tipo === "menu") {
        html = '<select id="sel" required><option value="">⚠️ Selecione uma opção...</option>';
        html += q.opcoes.map(o => `<option value="${o}">${o}</option>`).join("");
        html += "</select>";
    } else if (q.tipo === "checkbox") {
        html = '<div style="text-align: left;">';
        html += '<p style="color: #ff6b6b; font-size: 14px; margin-bottom: 10px;">⚠️ Escolha pelo menos uma opção:</p>';
        q.opcoes.forEach((opcao, i) => {
            html += `
                <label style="display: block; margin-bottom: 12px; cursor: pointer; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px; transition: 0.3s;">
                    <input type="checkbox" name="check" value="${opcao}" style="margin-right: 10px; cursor: pointer;">
                    ${opcao}
                </label>
            `;
        });
        html += '</div>';
    }

    optionsEl.innerHTML = html;

    if (atual === perguntas.length - 1) {
        btnNext.innerText = 'Ver meu Resultado! 🔥';
    } else {
        btnNext.innerText = 'Próxima';
    }
}

function proxima() {
    // Bloqueia cliques múltiplos durante envio
    if (enviando) return;

    const q = perguntas[atual];
    let resposta = null;

    // VALIDAÇÃO RIGOROSA - MENU SUSPENSO
    if (q.tipo === "menu") {
        const sel = document.getElementById("sel");
        
        // Verifica se o elemento existe
        if (!sel) {
            alert("❌ Erro: elemento de seleção não encontrado!");
            return;
        }
        
        // Verifica se algo foi selecionado (não pode ser vazio)
        if (!sel.value || sel.value === "") { 
            alert("⚠️ Por favor, ESCOLHA UMA OPÇÃO para prosseguir.");
            sel.focus(); // Coloca o foco no select
            return;
        }
        
        resposta = sel.value;
    } 
    
    // VALIDAÇÃO RIGOROSA - CHECKBOX (múltipla escolha)
    else if (q.tipo === "checkbox") {
        const checks = document.querySelectorAll('input[name="check"]:checked');
        
        // Verifica se pelo menos uma opção foi marcada
        if (checks.length === 0) {
            alert("⚠️ Por favor, ESCOLHA PELO MENOS UMA OPÇÃO para prosseguir.");
            return;
        }
        
        // Junta todas as respostas marcadas com vírgula
        resposta = Array.from(checks).map(c => c.value).join(", ");
    }

    // Se chegou aqui, a validação passou
    respostas.push(resposta);
    atual++;

    // Vai para próxima pergunta ou finaliza
    if (atual < perguntas.length) {
        mostrar();
        window.scrollTo(0, 0); // Rola a página para o topo
    } else {
        // Quiz finalizado - envia respostas
        mudarTelaEnviando("Processando suas respostas... 🔥");
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
        
        const resultado = await response.text();
        console.log('📄 Conteúdo da resposta:', resultado);

        if (response.ok) {
            mudarTelaEnviando("✅ Respostas enviadas com sucesso! Obrigado por participar! 🔥");
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
