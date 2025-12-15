const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
const imageCache = {};

const telas = [
    // TELA 0 - Boas-vindas
    { tipo: "transicao", bg: "./quiz/BGBV.jpg", botao: "Começar sua Jornada" },
    
    // TELA 1 - Portal 1
    { tipo: "transicao", bg: "./quiz/BG01P01.png", botao: "Iniciar Portal 1" },
    
    // TELAS 2-6 - Perguntas Portal 1
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"] },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "E o seu 'currículo amoroso'?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    
    // TELA 7 - Portal 2
    { tipo: "transicao", bg: "./quiz/BG02P02.png", botao: "Iniciar Portal 2" },
    
    // TELAS 8-13 - Perguntas Portal 2
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O tamanho importa? Qual a preferência da Deusa?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"] },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que normalmente te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação externa com dedos","Brinquedinhos","Estimulação anal","Vários ao mesmo tempo"] },
    
    // TELA 14 - Portal 3
    { tipo: "transicao", bg: "./quiz/BG03P03.png", botao: "Iniciar Portal 3" },
    
    // TELAS 15-22 - Perguntas Portal 3
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Quando a imaginação bate sozinha, a que você recorre:", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Já experimentou pessoas do mesmo sexo na cama?", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Já teve experiências a três (2 homens e você)?", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Experiências a três (você, uma amiga e um parceiro)?", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Experiências com pessoas trans?", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Sexo com total desconhecido(a)?", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Troca de casais / Swing?", descricao: "Foi convidada pelo parceiro para troca de casais.", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Suruba (mais de 3 pessoas)?", descricao: "Foi convidada para uma suruba com mais de 3 pessoas envolvidas.", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    
    // TELA 23 - Portal 4
    { tipo: "transicao", bg: "./quiz/BG04P04.png", botao: "Iniciar Portal 4" },
    
    // TELAS 24-30 - Perguntas Portal 4
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "O que você prefere, no geral?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Inversão de papéis", descricao: "Homem no papel de \"seu escravo\", obedecendo às suas ordens.", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Bondage", descricao: "Ser imobilizada ou imobilizar o outro com algemas, cordas, amarras, uso de chicotes, castigar ou ser castigada.", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Moderado", descricao: "Tapas, puxões, apertos, prendedores, estímulos de dor controlada.", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Intenso", descricao: "Situações em que a dor intensa com uso de acessórios é parte central da cena.", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Humilhação erótica do parceiro", descricao: "Rebaixar, provocar, \"pisar\", xingar o parceiro, chamar de \"corno\", \"manso\" etc. em contexto sexual, com consenso.", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Pegging", descricao: "Usar uma cinta no parceiro, fazendo dele seu submisso, invertendo o jogo.", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    
    // TELA 31 - Portal 5
    { tipo: "transicao", bg: "./quiz/BG05P05.png", botao: "Iniciar Portal 5" },
    
    // TELAS 32-38 - Perguntas Portal 5
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "\"Traição\" com consentimento", descricao: "Ficar com outra pessoa onde o parceiro sabe, autoriza e gosta.", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Clássica", descricao: "Você transa com outro homem enquanto seu parceiro assiste.", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Confidência Divina da HotWife", descricao: "Você sai com outro e depois conta todos os detalhes para seu parceiro.", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Adoração Sagrada da Hotwife", descricao: "Você transa com outro na frente do parceiro. Ele só pode assistir.", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Hotwife Soberana", descricao: "Você transando com outro e ordenando seu parceiro a interagir.", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "O Trono da Cuckqueen", descricao: "Você assiste seu parceiro com outra, mas controla toda a cena.", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Banquete Profano da Deusa", descricao: "Todos com todos, em um festim sob a regência da Deusa.", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    
    // TELA 39 - Transição Rito Dourado
    { tipo: "transicao", bg: "./quiz/BGRDOURADO.png", botao: "Continuar para o Rito Dourado" },
    
    // TELAS 40-45 - Perguntas Rito Dourado
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Trindade Profana da Deusa", descricao: "Com você, seu parceiro e outra mulher, qual cena te chama atenção?", campo: "q34_cenaTrindade", checkbox: ["Beijar e tocar a mulher enquanto o parceiro assiste","As duas com ele ao mesmo tempo","Você e ela se divertindo mais entre vocês","Ele te estimula enquanto você brinca com ela","Revezar entre os três"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Numa situação a três com outra mulher, seu foco seria…?", campo: "q35_focoTrindade", checkbox: ["Não faria de forma alguma","Sentir tesão com ela, independente dele","Dividir o parceiro e curtir os três","Deixar ele olhar enquanto você aproveita com ela","Ser o centro das atenções dos dois","Observar tudo"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "E o ciúmes nessa história?", campo: "q36_ciumesTrindade", menu: ["Eu travaria, não consigo nem imaginar","Teria ciúmes, mas a excitação falaria mais alto","Com regras claras, eu relaxo","Me excita ver ele com outra na minha frente","Seria mais ciumenta com ela do que com ele"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Golden Shower", descricao: "Prática em que o xixi se torna instrumento de prazer e dominação.", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Qual vibe de golden shower mais parece com você?", campo: "q38_goldenVibe", checkbox: ["Me dá mais nojo do que tesão","Sinto curiosidade","Vejo como humilhação erótica","Vejo como dominação intensa","Forma extrema de intimidade","Me excita mais a ideia que a prática"] },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Rito Dourado: qual papel combina com você?", campo: "q39_goldenPapel", checkbox: ["Fazer xixi no parceiro","Receber o xixi do parceiro","Alternar os papéis","Só assistir a cena","Nenhuma dessas por enquanto"] }
];

// Preload de imagens
function preloadAllImages() {
    const uniqueImages = [...new Set(telas.map(t => t.bg))];
    uniqueImages.forEach(url => {
        if (!imageCache[url]) {
            const img = new Image();
            img.src = url;
            imageCache[url] = img;
        }
    });
}

// Atualiza barra de progresso
function atualizarProgresso() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progresso = (telaAtual / (telas.length - 1)) * 100;
        progressBar.style.width = `${progresso}%`;
    }
}

// Mostra tela com animação
function mostrarTela() {
    const tela = telas[telaAtual];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    // Atualiza progresso
    atualizarProgresso();
    
    // Aplica background com transição
    body.style.backgroundImage = `url('${tela.bg}')`;
    
    if (tela.tipo === "transicao") {
        container.innerHTML = '';
        btnContainer.innerHTML = `<button type="button" id="btn-avancar">${tela.botao}</button>`;
        
        setTimeout(function() {
            const btn = document.getElementById('btn-avancar');
            if (btn) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    animarTransicao(avancarTela);
                };
            }
        }, 50);
        
    } else if (tela.tipo === "pergunta") {
        let html = `<div id="question-box">
            <div class="question-title">${tela.texto}</div>
            ${tela.descricao ? `<div class="question-desc">${tela.descricao}</div>` : ''}
        </div><div id="options-box">`;
        
        if (tela.menu) {
            html += '<select id="resposta" required><option value="">Selecione uma opção...</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select>';
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '';
            
            setTimeout(function() {
                const sel = document.getElementById('resposta');
                if (sel) {
                    sel.onchange = function() {
                        if (this.value) {
                            salvarRespostaMenu();
                            setTimeout(function() {
                                animarTransicao(avancarTela);
                            }, 200);
                        }
                    };
                }
            }, 50);
            
        } else if (tela.checkbox) {
            tela.checkbox.forEach(o => html += `<label><input type="checkbox" name="check" value="${o}"><span>${o}</span></label>`);
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(function() {
                const btn = document.getElementById('btn-proxima');
                if (btn) {
                    btn.onclick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        validarCheckboxEAvancar();
                    };
                }
            }, 50);
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animação de transição entre telas
function animarTransicao(callback) {
    const container = document.getElementById("quiz-container");
    const questionBox = container.querySelector('#question-box');
    const optionsBox = container.querySelector('#options-box');
    
    if (questionBox) questionBox.classList.add('fade-out');
    if (optionsBox) optionsBox.classList.add('fade-out');
    
    setTimeout(callback, 300);
}

function salvarRespostaMenu() {
    const tela = telas[telaAtual];
    const sel = document.getElementById("resposta");
    
    if (sel && sel.value) {
        answers[tela.campo] = sel.value;
    }
}

function avancarTela() {
    if (enviando) return;
    telaAtual++;
    if (telaAtual >= telas.length) {
        calcularResultado();
    } else {
        mostrarTela();
    }
}

function validarCheckboxEAvancar() {
    if (enviando) return;
    const tela = telas[telaAtual];
    
    const checks = document.querySelectorAll('input[name="check"]:checked');
    if (checks.length === 0) {
        // Feedback visual ao invés de alert
        const optionsBox = document.getElementById('options-box');
        optionsBox.style.animation = 'none';
        optionsBox.offsetHeight; // Trigger reflow
        optionsBox.style.animation = 'shake 0.5s ease';
        return;
    }
    
    answers[tela.campo] = Array.from(checks).map(c => c.value).join(", ");
    animarTransicao(avancarTela);
}

function calcularResultado() {
    const s = { HESTIA: 10, ATENA: 10, PERSEFONE: 10, AFRODITE: 10, LILITH: 10 };
    const max = Math.max(...Object.values(s));
    const vencedor = Object.keys(s).find(k => s[k] === max) || "PERSEFONE";
    mostrarResultado(vencedor);
}

function mostrarResultado(deusa) {
    const resultados = {
        HESTIA: { 
            titulo: "Héstia – A Deusa do Fogo Contido", 
            texto: `Você é da linhagem de Héstia: a Deusa do fogo do lar.

Sua força mora no cuidado, na estabilidade, em manter tudo funcionando. Você é aquela que segura a casa, o relacionamento, os BOs – muitas vezes sozinha.

No meio de tanta responsabilidade, o seu desejo foi ficando em segundo, terceiro, último lugar. Você aprendeu a ser "a pessoa certa" antes de ser a mulher inteira.

Seu prazer existe, mas vive cheio de condicionais: "se sobrar tempo", "se eu não estiver cansada", "se tudo estiver em ordem".

No Oráculo das Deusas, o seu movimento é lembrar que cuidar de tudo não significa se abandonar. Quando você volta pra si e acende o seu próprio fogo, o resto da vida começa a encaixar muito melhor.`
        },
        ATENA: { 
            titulo: "Atena – A Deusa Racional", 
            texto: `Você é da linhagem de Atena: a Deusa Racional.

Você é brilhante, analítica, rápida pra entender tudo – menos quando o assunto é sentir. Seu maior superpoder é a mente, mas é justamente ela que muitas vezes levanta um muro entre você e o seu próprio prazer.

Você gosta de ter controle, de saber o que vai acontecer, de não "se expor demais". Antes de se permitir, você pensa, avalia, pesa prós e contras.

Não é que você não tenha desejo. Você tem – mas ele passa primeiro por um interrogatório mental.

No Oráculo das Deusas, o seu caminho é sair só da cabeça e começar a descer pro corpo, sem perder a inteligência – mas usando ela a seu favor.`
        },
        PERSEFONE: { 
            titulo: "Perséfone – A Deusa Entre Dois Mundos", 
            texto: `Você é da linhagem de Perséfone: a Deusa que caminha entre dois mundos.

Uma parte sua ainda é educada, "correta", discreta. A outra já flerta com fantasias, curiosidades e cenários que talvez você não tenha vivido, mas pensa em viver.

Você é mais profunda do que deixa transparecer. Tem pensamentos, desejos e fantasias que raramente coloca em voz alta.

Seu universo interno é intenso, misterioso, cheio de encruzilhadas: ora quer segurança, ora quer o proibido.

No Oráculo das Deusas, o seu trabalho não é escolher um lado e matar o outro, e sim integrar: explorar com consciência o que te chama, sem vergonha da sua profundidade.`
        },
        AFRODITE: { 
            titulo: "Afrodite – A Deusa em Despertar", 
            texto: `Você é da linhagem de Afrodite: a Deusa em Despertar.

Seu corpo fala. Seu desejo existe. Sua energia é naturalmente magnética – mesmo quando você finge que não é.

Você sente vontade de mais: mais prazer, mais presença, mais intensidade. Só que, junto com a vontade, às vezes vem a culpa, o julgamento interno.

Você já se permite em alguns momentos, mas ainda oscila: se solta e depois se pergunta se passou do ponto.

No Oráculo das Deusas, seu caminho é parar de pedir desculpa pelo que sente. Afrodite em você só precisa de espaço pra existir sem censura.`
        },
        LILITH: { 
            titulo: "Lilith – A Deusa Indomável", 
            texto: `Você é da linhagem de Lilith: a Deusa Indomável.

Você não nasceu pra viver pela régua dos outros. Você sente intensamente, deseja profundamente e, no fundo, sabe que não foi feita pra viver uma vida morna.

Quando você se permite, o seu prazer vem junto com uma sensação de poder, de presença, de "estou exatamente onde quero estar".

Você aprendeu a selecionar: nem todo mundo merece acesso à sua versão mais crua, mais honesta, mais deliciosa de ser.

No Oráculo das Deusas, seu caminho não é "se domar", e sim refinar sua força. Criar um espaço onde sua intensidade é bem-vinda.`
        }
    };
    
    const r = resultados[deusa];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    const progressContainer = document.getElementById("progress-container");
    
    // Esconde progress bar no resultado
    if (progressContainer) progressContainer.style.opacity = '0';
    
    body.style.backgroundImage = `url('./quiz/BGRESULT.jpg')`;
    container.innerHTML = `<div class="resultado-box"><h1>${r.titulo}</h1><p>${r.texto}</p></div>`;
    btnContainer.innerHTML = '';
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    enviando = true;
    
    const respostasArray = Object.values(answers);
    
    console.log('📤 Enviando respostas...');
    
    try {
        const formData = new FormData();
        formData.append('respostas', JSON.stringify(respostasArray));
        
        const response = await fetch(WEBAPP_URL, { 
            method: 'POST',
            body: formData
        });
        
        const responseText = await response.text();
        console.log('✅ Resposta:', responseText);
        
    } catch (e) {
        console.error('❌ Erro:', e);
    } finally {
        enviando = false;
    }
}

// Adiciona animação de shake para feedback de erro
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-8px); }
        80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(shakeStyle);

window.addEventListener('DOMContentLoaded', function() {
    preloadAllImages();
    mostrarTela();
});
