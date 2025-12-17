const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
let pontuacaoTotal = 0;

const pontuacaoRespostas = {
    "Nunca fiz e não tenho vontade": 1,
    "Nunca fiz mas tenho curiosidade": 2,
    "Já fiz e não gostei": 2,
    "Já fiz e repetiria com prazer": 4
};

const telas = [
    { tipo: "inicio" },
    { tipo: "pergunta", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"] },
    { tipo: "pergunta", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"] },
    { tipo: "pergunta", texto: "E o seu 'currículo amoroso'?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    { tipo: "pergunta", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"] },
    { tipo: "pergunta", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"] },
    { tipo: "pergunta", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"] },
    { tipo: "pergunta", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"] },
    { tipo: "pergunta", texto: "O tamanho importa?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"] },
    { tipo: "pergunta", texto: "O que te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação externa com dedos","Brinquedinhos","Estimulação anal","Vários ao mesmo tempo"] },
    { tipo: "pergunta", texto: "Quando está sozinha, a que você recorre?", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"] },
    { tipo: "pergunta", texto: "Pessoas do mesmo sexo na cama?", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "A três (2 homens e você)?", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "A três (você, amiga e parceiro)?", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Com pessoas trans?", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sexo com total desconhecido(a)?", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Troca de casais / Swing?", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Suruba (mais de 3 pessoas)?", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "O que você prefere, no geral?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"] },
    { tipo: "pergunta", texto: "Inversão de papéis", descricao: "Homem obedecendo às suas ordens.", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Bondage", descricao: "Imobilização com algemas, cordas, amarras.", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sado Moderado", descricao: "Tapas, puxões, estímulos de dor controlada.", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sado Intenso", descricao: "Dor intensa com acessórios como parte central.", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Humilhação erótica do parceiro", descricao: "Rebaixar, provocar como parte do jogo de poder.", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Pegging", descricao: "Usar cinta/consolo no parceiro.", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Traição com consentimento", descricao: "Parceiro sabe, autoriza e gosta.", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Hotwife Clássica", descricao: "Transar com outro enquanto parceiro assiste.", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Confidência Divina da HotWife", descricao: "Sair com outro e contar os detalhes depois.", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Adoração Sagrada da Hotwife", descricao: "Ele só pode assistir, sem interagir.", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Hotwife Soberana", descricao: "Ordenar seu parceiro a interagir com o outro.", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Trono da Cuckqueen", descricao: "Assistir e controlar a cena dele com outra.", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Banquete Profano", descricao: "Todos com todos, orgia sob sua regência.", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Cena a três que mais te atrai?", campo: "q34_cenaTrindade", checkbox: ["Beijar ela enquanto ele assiste","As duas com ele","Você e ela mais entre vocês","Ele te estimula enquanto você brinca com ela","Revezar entre os três"] },
    { tipo: "pergunta", texto: "Seu foco numa situação a três?", campo: "q35_focoTrindade", checkbox: ["Não faria","Tesão com ela, independente dele","Dividir o parceiro","Deixar ele olhar","Ser o centro das atenções","Observar tudo"] },
    { tipo: "pergunta", texto: "E o ciúmes nessa história?", campo: "q36_ciumesTrindade", menu: ["Eu travaria completamente","Teria ciúmes, mas a excitação vence","Com regras claras, relaxo","Me excita ver ele com outra","Mais ciumenta com ela"] },
    { tipo: "pergunta", texto: "Golden Shower", descricao: "Xixi como instrumento de prazer e dominação.", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Qual vibe de golden shower?", campo: "q38_goldenVibe", checkbox: ["Mais nojo que tesão","Curiosidade","Humilhação erótica","Dominação intensa","Intimidade extrema","Mais ideia que prática"] },
    { tipo: "pergunta", texto: "Qual papel no Rito Dourado?", campo: "q39_goldenPapel", checkbox: ["Fazer no parceiro","Receber dele","Alternar","Só assistir","Nenhuma por enquanto"] }
];

const resultados = {
    1: {
        titulo: "O Iniciante",
        subtitulo: "Exploração e Descoberta",
        descricao: "Foco no autoconhecimento, na intimidade suave e na comunicação básica. A exploração é introspectiva e segura. Você está no início de uma jornada de descobertas.",
        brinquedos: [
            { nome: "Vibrador Bullet", desc: "Ponta fina e versátil para exploração" },
            { nome: "Óleos de massagem comestíveis", desc: "Para despertar os sentidos" },
            { nome: "Lubrificante à base de água", desc: "Essencial para conforto" },
            { nome: "Vibrador tipo Rabbit", desc: "Estimulação dupla prazerosa" },
            { nome: "Anel peniano vibratório", desc: "Para prazer em casal" }
        ],
        roupas: [
            { nome: "Lingerie de renda simples", desc: "Sutiã e calcinha elegantes" },
            { nome: "Meias 7/8", desc: "Toque sensual clássico" },
            { nome: "Máscara de dormir de seda", desc: "Para aguçar outros sentidos" },
            { nome: "Camisola de cetim", desc: "Conforto com sensualidade" }
        ],
        fantasias: [
            { nome: "Massagem erótica sensual", desc: "Toques em todo o corpo, não apenas nas áreas óbvias" },
            { nome: "Beijos e toques prolongados", desc: "Explorar zonas sensíveis como orelhas e pescoço" },
            { nome: "Exibicionismo leve em casa", desc: "Roupas ousadas com cortinas abertas" },
            { nome: "Filmes e literatura erótica", desc: "Expandir a imaginação juntos" }
        ],
        parceiros: "Pessoas que valorizam a ternura, a comunicação clara e que estão dispostas a ir devagar."
    },
    2: {
        titulo: "O Explorador",
        subtitulo: "Aprofundamento e Prazer Mútuo",
        descricao: "O foco passa da autodescoberta para o aprofundamento da intimidade e a busca por orgasmos mais intensos e variados. Você está pronta para expandir horizontes.",
        brinquedos: [
            { nome: "Vibrador de Ponto G", desc: "Para orgasmos mais intensos" },
            { nome: "Vibrador com controle remoto", desc: "Para uso em público" },
            { nome: "Vibrador Wand", desc: "Potência e massagem profunda" },
            { nome: "Bolas Ben Wa", desc: "Exercícios e sensação interna" },
            { nome: "Plug anal pequeno", desc: "Iniciação à estimulação anal" }
        ],
        roupas: [
            { nome: "Conjuntos strappy", desc: "Com tiras decorativas sensuais" },
            { nome: "Corselet ou espartilho leve", desc: "Valoriza as curvas" },
            { nome: "Algemas de pelúcia", desc: "Restrição suave e divertida" },
            { nome: "Meias arrastão", desc: "Visual ousado" }
        ],
        fantasias: [
            { nome: "Sexo em lugares diferentes", desc: "Locais privados com adrenalina" },
            { nome: "Venda Sensorial", desc: "Retirar visão para amplificar sensações" },
            { nome: "Exploração oral no corpo todo", desc: "Intimidade além do genital" },
            { nome: "Roleplay Celebridade e Fã", desc: "Jogo de adoração e devoção" }
        ],
        parceiros: "Pessoas que gostam de experimentar novos tipos de orgasmo e valorizam a diversão no sexo."
    },
    3: {
        titulo: "O Ousado",
        subtitulo: "Limites e Quebra de Regras",
        descricao: "Introdução controlada a elementos de BDSM, jogos de poder e exploração de pequenos tabus. Você está pronta para testar seus limites com segurança.",
        brinquedos: [
            { nome: "Paddle de silicone", desc: "Dor suave e consensual" },
            { nome: "Vibrador de sucção", desc: "Estimulação clitoriana intensa" },
            { nome: "Mordaça de seda", desc: "Restrição oral não-invasiva" },
            { nome: "Algemas de couro macio", desc: "Imobilização elegante" },
            { nome: "Vibradores duplos", desc: "Para prazer simultâneo" }
        ],
        roupas: [
            { nome: "Roupas em vinil ou látex", desc: "Look de dominadora" },
            { nome: "Máscaras e vendas escuras", desc: "Mistério e sensorialidade" },
            { nome: "Chicote ou Crop", desc: "Acessório de poder" },
            { nome: "Botas de cano alto", desc: "Autoridade no visual" },
            { nome: "Coleiras e gargantilhas", desc: "Simbolismo de posse" }
        ],
        fantasias: [
            { nome: "Dominação e Submissão leves", desc: "Um assume controle temporário" },
            { nome: "Spanking consensual", desc: "Palmadas para dor e prazer" },
            { nome: "Tease and Denial", desc: "Provocar e negar o orgasmo" },
            { nome: "Exibicionismo mútuo seguro", desc: "Pequenas exposições controladas" }
        ],
        parceiros: "Pessoas que gostam de jogos de poder light e têm confiança para estabelecer limites firmes."
    },
    4: {
        titulo: "O Aventureiro",
        subtitulo: "Desafio e Submissão Profunda",
        descricao: "Hotwife / Cuckold Leve. O tesão é o jogo mental: você se sentir desejada por outros, ele sentir orgulho e excitação. Tudo gira em torno de roteiro e limites claros.",
        brinquedos: [
            { nome: "Vibrador com controle remoto avançado", desc: "Estimulação à distância, risco e adrenalina" },
            { nome: "Consolo realístico", desc: "Simula a presença do terceiro na fantasia" },
            { nome: "Coleira + guia estética", desc: "Simbolismo de posse e controle" },
            { nome: "Kit amarração leve", desc: "Vulnerabilidade controlada do parceiro" },
            { nome: "Masturbador masculino premium", desc: "Para o Cuckold focar em seu prazer" }
        ],
        roupas: [
            { nome: "Vestido preto transparente", desc: "Exposição controlada com lingerie aparente" },
            { nome: "Vestido curto vinho colado", desc: "Alto impacto que atrai olhares" },
            { nome: "Saia micro + meia 7/8", desc: "Visual sedutor de exposição sutil" },
            { nome: "Salto alto fino preto", desc: "Poder, postura e autoconfiança" },
            { nome: "Strappy discreto sob o look", desc: "Segredo de kink só do casal" }
        ],
        fantasias: [
            { nome: "Exposição Controlada (Troféu)", desc: "Look provocante + olhares externos + poder do desejo" },
            { nome: "Date Solo Roteirizado", desc: "Sair sozinha, mandar mensagens, voltar com clima pronto" },
            { nome: "Cena da Porta no Hotel", desc: "Simular retorno de encontro, acender o fósforo" },
            { nome: "Casa de Swing como Passeio", desc: "Absorver o clima sem precisar fazer nada" },
            { nome: "Relato Guiado", desc: "Contar cena imaginada olhando nos olhos dele" }
        ],
        parceiros: "Pessoas com alto nível de confiança, que valorizam Safe Word e se sentem seguras em experimentar."
    },
    5: {
        titulo: "O Radical",
        subtitulo: "Transgressão Total",
        descricao: "Hotwife / Cuckold Avançado. Experiência completa: preparação, performance, suspense, pós-cena e ritual. Você não só participa — você dirige e ritualiza a noite.",
        brinquedos: [
            { nome: "Sex machine", desc: "Prazer mecânico intenso e performance" },
            { nome: "Cinto de castidade", desc: "Final raro e ritualístico para o Cuckold" },
            { nome: "Plug avançado", desc: "Concentração na submissão dele" },
            { nome: "Consolo grande/realístico", desc: "Impacto elevado na cena" },
            { nome: "Masturbador premium", desc: "Controle total da recompensa dele" }
        ],
        roupas: [
            { nome: "Conjunto vinil/couro completo", desc: "Look de domínio total" },
            { nome: "Lingerie de transparência forte", desc: "Exposição e vulnerabilidade" },
            { nome: "Peruca + óculos (persona)", desc: "Criar personagem, separar fantasia da realidade" },
            { nome: "Salto altíssimo de impacto", desc: "Autoridade no andar" },
            { nome: "Arnês/strappy completo", desc: "Armadura de poder sexual" }
        ],
        fantasias: [
            { nome: "A Noite da Hotwife", desc: "Montar persona completa e conduzir com autoridade" },
            { nome: "Roteiro em 3 Atos", desc: "Produção, suspense e cena intensa como teatro" },
            { nome: "Mensagens ao Vivo", desc: "Áudios se arrumando, ele submisso ao processo" },
            { nome: "Debrief Cinematográfico", desc: "Contar tudo com riqueza, gatilho para cena final" },
            { nome: "Exibicionismo de Risco Elevado", desc: "Dogging - adrenalina no ápice" }
        ],
        parceiros: "Pessoas com experiência em kink, que praticam Consenso Entusiástico e veem o terceiro como ferramenta do jogo."
    }
};

function atualizarProgresso() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progresso = (telaAtual / (telas.length - 1)) * 100;
        progressBar.style.width = `${progresso}%`;
    }
}

function contarPerguntas() {
    return telas.filter(t => t.tipo === 'pergunta').length;
}

function getPerguntaAtual() {
    let count = 0;
    for (let i = 0; i <= telaAtual; i++) {
        if (telas[i].tipo === 'pergunta') count++;
    }
    return count;
}

function mostrarTela() {
    const tela = telas[telaAtual];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    atualizarProgresso();
    
    if (tela.tipo === "inicio") {
        container.innerHTML = `
            <div class="tela-inicial fade-in">
                <h1>Teste de Nível<br>de Sexualidade</h1>
                <p>Descubra seu perfil através de ${contarPerguntas()} perguntas sobre suas preferências e experiências.</p>
            </div>
        `;
        btnContainer.innerHTML = `<button type="button" id="btn-iniciar">Começar</button>`;
        
        setTimeout(() => {
            document.getElementById('btn-iniciar').onclick = () => avancarTela();
        }, 50);
        
    } else if (tela.tipo === "pergunta") {
        const numPergunta = getPerguntaAtual();
        const totalPerguntas = contarPerguntas();
        
        let html = `
            <div id="question-box" class="fade-in">
                <div class="question-number">Pergunta ${numPergunta} de ${totalPerguntas}</div>
                <div class="question-title">${tela.texto}</div>
                ${tela.descricao ? `<div class="question-desc">${tela.descricao}</div>` : ''}
            </div>
            <div id="options-box" class="fade-in">
        `;
        
        if (tela.menu) {
            html += '<select id="resposta"><option value="">Selecione uma opção</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select></div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '';
            
            setTimeout(() => {
                document.getElementById('resposta').onchange = function() {
                    if (this.value) {
                        salvarResposta(tela, this.value);
                        setTimeout(() => avancarTela(), 250);
                    }
                };
            }, 50);
            
        } else if (tela.checkbox) {
            tela.checkbox.forEach(o => {
                html += `<label><input type="checkbox" name="check" value="${o}"><span>${o}</span></label>`;
            });
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(() => {
                document.getElementById('btn-proxima').onclick = () => {
                    const checks = document.querySelectorAll('input[name="check"]:checked');
                    if (checks.length === 0) {
                        document.getElementById('options-box').style.animation = 'none';
                        document.getElementById('options-box').offsetHeight;
                        document.getElementById('options-box').style.animation = 'shake 0.4s ease';
                        return;
                    }
                    salvarResposta(tela, Array.from(checks).map(c => c.value).join(", "));
                    avancarTela();
                };
            }, 50);
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function salvarResposta(tela, valor) {
    answers[tela.campo] = valor;
    if (tela.pontuavel && pontuacaoRespostas[valor]) {
        pontuacaoTotal += pontuacaoRespostas[valor];
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

function calcularResultado() {
    const perguntasPontuaveis = telas.filter(t => t.pontuavel).length;
    const pontuacaoMaxima = perguntasPontuaveis * 4;
    const porcentagem = (pontuacaoTotal / pontuacaoMaxima) * 100;
    
    let nivel;
    if (porcentagem <= 25) nivel = 1;
    else if (porcentagem <= 40) nivel = 2;
    else if (porcentagem <= 55) nivel = 3;
    else if (porcentagem <= 75) nivel = 4;
    else nivel = 5;
    
    mostrarResultado(nivel);
}

function mostrarResultado(nivel) {
    const r = resultados[nivel];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    const progressContainer = document.getElementById("progress-container");
    
    if (progressContainer) progressContainer.style.display = 'none';
    
    container.innerHTML = `
        <div class="resultado-container fade-in">
            <div class="resultado-nivel">
                <div class="nivel-badge">Nível ${nivel}</div>
                <h1>${r.titulo}</h1>
                <div class="subtitulo">${r.subtitulo}</div>
            </div>
            
            <p class="resultado-descricao">${r.descricao}</p>
            
            <div class="resultado-secao">
                <h2>Brinquedos Sugeridos</h2>
                <ul>
                    ${r.brinquedos.map(b => `<li><strong>${b.nome}</strong><span>${b.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Roupas e Acessórios</h2>
                <ul>
                    ${r.roupas.map(ro => `<li><strong>${ro.nome}</strong><span>${ro.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Fantasias a Explorar</h2>
                <ul>
                    ${r.fantasias.map(f => `<li><strong>${f.nome}</strong><span>${f.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Parceiros Compatíveis</h2>
                <ul>
                    <li>${r.parceiros}</li>
                </ul>
            </div>
        </div>
    `;
    
    btnContainer.innerHTML = '';
    answers['nivel_resultado'] = nivel;
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    enviando = true;
    const respostasArray = Object.values(answers);
    
    try {
        const formData = new FormData();
        formData.append('respostas', JSON.stringify(respostasArray));
        await fetch(WEBAPP_URL, { method: 'POST', body: formData });
        console.log('✅ Enviado');
    } catch (e) {
        console.error('❌ Erro:', e);
    } finally {
        enviando = false;
    }
}

const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => mostrarTela());
