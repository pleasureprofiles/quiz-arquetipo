const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
const imageCache = new Map();

const telas = [
    { tipo: "transicao", bg: "./quiz/BGBV.jpg", botao: "Começar sua Jornada" },
    { tipo: "transicao", bg: "./quiz/BG01P01.png", botao: "Iniciar Portal 1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "E o seu 'currículo amoroso'?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    { tipo: "transicao", bg: "./quiz/BG02P02.png", botao: "Iniciar Portal 2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O tamanho importa? Qual a preferência?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação com dedos","Brinquedos","Estimulação anal","Vários ao mesmo tempo"] },
    { tipo: "transicao", bg: "./quiz/BG03P03.png", botao: "Iniciar Portal 3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Quando a imaginação bate sozinha, a que você recorre:", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Pessoas do mesmo sexo", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "A três (2 homens e você)", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "A três (você, amiga e parceiro)", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Com pessoas trans", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Com total desconhecido(a)", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Troca de casais / Swing", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Suruba (mais de 3 pessoas)", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "transicao", bg: "./quiz/BG04P04.png", botao: "Iniciar Portal 4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "O que você prefere?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Inversão de papéis", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Bondage", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Moderado", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Intenso", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Humilhação erótica", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Pegging", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "transicao", bg: "./quiz/BG05P05.png", botao: "Iniciar Portal 5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Traição com consentimento", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Clássica", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Confidência Divina da HotWife", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Adoração Sagrada da Hotwife", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Soberana", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Trono da Cuckqueen", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Banquete Profano da Deusa", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "transicao", bg: "./quiz/BGRDOURADOLIMPO.png", botao: "Continuar" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Cenário com você, parceiro e outra mulher, qual te chama atenção?", campo: "q34_cenaTrindade", checkbox: ["Beijar ela enquanto ele assiste","As duas com ele","Você e ela mais que com ele","Ele te estimula e você com ela","Revezar"] },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Seu foco seria?", campo: "q35_focoTrindade", checkbox: ["Não faria","Tesão com ela","Dividir o parceiro","Ele olhar","Ser o centro","Observar"] },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "E o ciúmes?", campo: "q36_ciumesTrindade", menu: ["Eu travaria","Ciúmes mas excitação fala mais alto","Com regras claras relaxo","Me excita ver ele com outra","Mais ciumenta com ela"] },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Golden shower", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Que vibe?", campo: "q38_goldenVibe", checkbox: ["Nojo","Curiosidade","Humilhação erótica","Dominação intensa","Intimidade extrema","Mais ideia que prática"] },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Qual papel?", campo: "q39_goldenPapel", checkbox: ["Fazer","Receber","Alternar","Assistir","Nenhuma"] }
];

function preloadImage(url) {
    if (imageCache.has(url)) return Promise.resolve(url);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(url, true);
            resolve(url);
        };
        img.onerror = () => resolve(url);
        img.src = url;
    });
}

async function preloadNextImages() {
    const next = telaAtual + 1;
    if (next < telas.length) {
        preloadImage(telas[next].bg);
        if (next + 1 < telas.length) {
            preloadImage(telas[next + 1].bg);
        }
    }
}

async function mostrarTela() {
    const tela = telas[telaAtual];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    await preloadImage(tela.bg);
    body.style.backgroundImage = `url('${tela.bg}')`;
    container.classList.add('fade-in');
    
    if (tela.tipo === "transicao") {
        container.innerHTML = '';
        btnContainer.innerHTML = `<button onclick="proximaTela()">${tela.botao}</button>`;
    } else if (tela.tipo === "pergunta") {
        let html = `<div id="question-box">${tela.texto}</div><div id="options-box">`;
        
        if (tela.menu) {
            html += '<select id="resposta" required><option value="">Selecione...</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select>';
        } else if (tela.checkbox) {
            tela.checkbox.forEach(o => html += `<label><input type="checkbox" name="check" value="${o}">${o}</label>`);
        }
        
        html += '</div>';
        container.innerHTML = html;
        btnContainer.innerHTML = '<button onclick="proximaTela()">Próxima</button>';
    }
    
    preloadNextImages();
    window.scrollTo(0, 0);
    setTimeout(() => container.classList.remove('fade-in'), 400);
}

function proximaTela() {
    if (enviando) return;
    const tela = telas[telaAtual];
    
    if (tela.tipo === "pergunta") {
        let resp = null;
        
        if (tela.menu) {
            const sel = document.getElementById("resposta");
            if (!sel || !sel.value) { 
                alert("Escolha uma opção!"); 
                return; 
            }
            resp = sel.value;
            if (tela.menu[0] === "Nunca fiz e não tenho vontade") {
                resp = tela.menu.indexOf(sel.value) + 1;
            }
        } else if (tela.checkbox) {
            const checks = document.querySelectorAll('input[name="check"]:checked');
            if (checks.length === 0) { 
                alert("Escolha pelo menos uma opção!"); 
                return; 
            }
            resp = Array.from(checks).map(c => c.value);
        }
        
        answers[tela.campo] = resp;
    }
    
    telaAtual++;
    if (telaAtual >= telas.length) { 
        calcularResultado(); 
    } else { 
        mostrarTela(); 
    }
}

function calcularResultado() {
    const s = { HESTIA: 10, ATENA: 10, PERSEFONE: 10, AFRODITE: 10, LILITH: 10 };
    const max = Math.max(...Object.values(s));
    const vencedor = Object.keys(s).find(k => s[k] === max) || "PERSEFONE";
    mostrarResultado(vencedor);
}

async function mostrarResultado(deusa) {
    const resultados = {
        HESTIA: { titulo: "Héstia – Fogo Contido", texto: "Você é da linhagem de Héstia: a Deusa do fogo do lar.\n\nSua força mora no cuidado, na estabilidade, em manter tudo funcionando." },
        ATENA: { titulo: "Atena – A Racional", texto: "Você é da linhagem de Atena: a Deusa Racional.\n\nBrilhante, analítica, rápida para entender tudo – menos quando o assunto é sentir." },
        PERSEFONE: { titulo: "Perséfone – Entre Dois Mundos", texto: "Você é da linhagem de Perséfone: a Deusa que caminha entre dois mundos.\n\nEducada por fora, curiosa por dentro." },
        AFRODITE: { titulo: "Afrodite – Em Despertar", texto: "Você é da linhagem de Afrodite: a Deusa em Despertar.\n\nSeu corpo fala. Seu desejo existe. Sua energia é magnética." },
        LILITH: { titulo: "Lilith – Indomável", texto: "Você é da linhagem de Lilith: a Deusa Indomável.\n\nVocê não nasceu para viver pela régua dos outros." }
    };
    
    const r = resultados[deusa];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    await preloadImage('./quiz/BGRESULT.jpg');
    body.style.backgroundImage = `url('./quiz/BGRESULT.jpg')`;
    container.innerHTML = `<h1>${r.titulo}</h1><p>${r.texto}</p>`;
    btnContainer.innerHTML = '';
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    const formData = new FormData();
    formData.append('respostas', JSON.stringify(Object.values(answers)));
    try {
        await fetch(WEBAPP_URL, { method: 'POST', body: formData });
        console.log('✅ Enviado!');
    } catch (e) {
        console.error('Erro:', e);
    }
}

window.addEventListener('DOMContentLoaded', () => mostrarTela());
