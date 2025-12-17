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
    // TELA 0 - Boas-vindas
    { tipo: "boasvindas" },
    
    // PORTAL 1 - Perfil básico
    { tipo: "pergunta", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"] },
    { tipo: "pergunta", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"] },
    { tipo: "pergunta", texto: "E o seu 'currículo amoroso'?", descricao: "Quantos parceiros sexuais você já teve na vida?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    
    // PORTAL 2 - Prazer
    { tipo: "pergunta", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"] },
    { tipo: "pergunta", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"] },
    { tipo: "pergunta", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"] },
    { tipo: "pergunta", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"] },
    { tipo: "pergunta", texto: "O tamanho importa? Qual a preferência da Deusa?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"] },
    { tipo: "pergunta", texto: "O que normalmente te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação externa com dedos","Brinquedinhos","Estimulação anal","Vários ao mesmo tempo"] },
    
    // PORTAL 3 - Fantasias
    { tipo: "pergunta", texto: "Quando a imaginação bate sozinha, a que você recorre?", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"] },
    { tipo: "pergunta", texto: "Já experimentou pessoas do mesmo sexo na cama?", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Já teve experiências a três (2 homens e você)?", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Experiências a três (você, uma amiga e um parceiro)?", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Experiências com pessoas trans?", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sexo com total desconhecido(a)?", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Troca de casais / Swing?", descricao: "Foi convidada pelo parceiro para troca de casais.", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Suruba (mais de 3 pessoas)?", descricao: "Foi convidada para uma suruba com mais de 3 pessoas envolvidas.", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    
    // PORTAL 4 - Dominação
    { tipo: "pergunta", texto: "O que você prefere, no geral?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"] },
    { tipo: "pergunta", texto: "Inversão de papéis", descricao: "Homem no papel de \"seu escravo\", obedecendo às suas ordens.", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Bondage", descricao: "Ser imobilizada ou imobilizar o outro com algemas, cordas, amarras, uso de chicotes, castigar ou ser castigada.", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sado Moderado", descricao: "Tapas, puxões, apertos, prendedores, estímulos de dor controlada.", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Sado Intenso", descricao: "Situações em que a dor intensa com uso de acessórios é parte central da cena.", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Humilhação erótica do parceiro", descricao: "Rebaixar, provocar, \"pisar\", xingar o parceiro, chamar de \"corno\", \"manso\" etc. em contexto sexual, com consenso, como parte do jogo de poder.", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Pegging", descricao: "Usar uma cinta no parceiro. Você troca de lugar com seu parceiro, fazendo dele seu submisso com uso de cintas/consolos, invertendo o jogo.", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    
    // PORTAL 5 - Caixa preta
    { tipo: "pergunta", texto: "\"Traição\" com consentimento", descricao: "Ficar com outra pessoa onde o parceiro sabe, autoriza e gosta.", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Hotwife Clássica", descricao: "Você transa com outro homem enquanto seu parceiro assiste, podendo ou não ser humilhado verbalmente.", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "A Confidência Divina da HotWife", descricao: "Você sai com outro e quando volta conta todos os detalhes sórdidos para seu parceiro na cama, vendo ele delirar de tesão.", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "A Adoração Sagrada da Hotwife", descricao: "Você transa com outro na frente do seu parceiro. Ele assiste ao vivo mas não interage, só pode assistir enquanto você o encara nos olhos.", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "A Hotwife Soberana", descricao: "Você transando com outro homem e ordenando seu parceiro a interagir com ele, enquanto é humilhado como parte da cena consensual.", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "O Trono da Cuckqueen", descricao: "Você assiste seu parceiro com outra mulher, mas é você quem controla a cena: escolhe quem entra, até onde vai e quando termina.", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Banquete Profano da Deusa", descricao: "Cenário em que homens e mulheres se entrelaçam livremente — todos com todos — em um festim profano sob a regência da Deusa.", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    
    // Rito Dourado
    { tipo: "pergunta", texto: "Trindade Profana da Deusa", descricao: "Em um cenário com você, seu parceiro e outra mulher, qual dessas cenas mais te chama atenção?", campo: "q34_cenaTrindade", checkbox: ["Beijar e tocar a mulher enquanto o parceiro assiste","As duas com ele ao mesmo tempo","Você e ela se divertindo mais entre vocês do que com ele","Ele focado em te estimular enquanto você brinca com ela","Revezar: hora você com ele, hora ela com ele, hora só vocês duas"] },
    { tipo: "pergunta", texto: "Numa situação a três com outra mulher, seu foco principal seria…?", campo: "q35_focoTrindade", checkbox: ["Não faria de forma alguma","Sentir tesão com ela, independente dele","Dividir o parceiro e curtir a energia dos três juntos","Deixar ele olhar enquanto você aproveita com ela","Ser o centro das atenções dos dois","Deixar a outra mulher ser o centro e observar tudo"] },
    { tipo: "pergunta", texto: "E o ciúmes nessa história com outra mulher?", campo: "q36_ciumesTrindade", menu: ["Eu travaria, não consigo nem imaginar dividir ele","Teria ciúmes, mas acho que a excitação falaria mais alto","Se tiver regra clara, confiança e combinado, eu relaxo","Me excita justamente ver ele com outra na minha frente","Eu seria mais ciumenta com ela do que com ele"] },
    { tipo: "pergunta", texto: "Golden Shower", descricao: "Prática em que o xixi se torna instrumento de prazer, dominação e humilhação erótica, sempre dentro de um acordo entre a Deusa e seu parceiro.", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    { tipo: "pergunta", texto: "Quando você pensa em golden shower, qual dessas vibes mais parece com você?", campo: "q38_goldenVibe", checkbox: ["Me dá mais nojo do que tesão","Sinto curiosidade, mas ainda sem saber se ia rolar na prática","Vejo como parte de humilhação erótica","Vejo como um ato de dominação/submissão bem intenso","Enxergo como uma forma extrema de intimidade e confiança","Me excita mais a ideia do que a prática em si"] },
    { tipo: "pergunta", texto: "Rito Dourado da Deusa: qual papel mais combina com você?", campo: "q39_goldenPapel", checkbox: ["Fazer xixi no parceiro","Receber o xixi do parceiro","Alternar: às vezes dou, às vezes recebo","Só assistir a cena acontecendo, sem participar diretamente","Nenhuma dessas combina comigo (por enquanto)"] }
];

// RESULTADOS COMPLETOS - SEM PARCEIROS
const resultados = {
    1: {
        titulo: "O Iniciante",
        subtitulo: "Conexão Sensorial / Descoberta",
        descricao: "O foco é sair do \"automático\" e despertar a pele. Não é sobre performance, é sobre presença. O tesão vem da quebra da rotina e da exploração lenta de toques que foram esquecidos no dia a dia.",
        brinquedos: [
            { nome: "Vibrador bullet", desc: "Pequeno e direto, para descobrir pontos externos sem intimidar." },
            { nome: "Óleo de massagem térmico", desc: "Transforma o toque em experiência de temperatura e cheiro." },
            { nome: "Lubrificante premium", desc: "Remove qualquer atrito mecânico, deixando só a sensação." },
            { nome: "Anel peniano vibratório", desc: "Introduz a vibração compartilhada durante a penetração." },
            { nome: "Venda de seda", desc: "Elimina a visão para obrigar o corpo a sentir o triplo." }
        ],
        roupas: [
            { nome: "Camisola de cetim/seda", desc: "O toque do tecido na pele já inicia a sensibilidade antes do ato." },
            { nome: "Lingerie de renda confortável", desc: "Bonita para ele, mas confortável para você se sentir bem." },
            { nome: "Meia 7/8 simples", desc: "Um clássico visual que molda a perna sem apertar." },
            { nome: "Camisa social dele", desc: "Vestir apenas isso cria um imaginário de intimidade e posse leve." },
            { nome: "Máscara de dormir", desc: "Simples, funcional e cria o mistério imediato." }
        ],
        fantasias: [
            { nome: "O Jogo do Silêncio", desc: "Proibido falar. Vocês se comunicam apenas pelo toque e pela respiração, forçando uma atenção total à linguagem corporal do outro." },
            { nome: "Massagem Cega", desc: "Você vendada, ele usa diferentes texturas (pena, gelo, óleo) no seu corpo. Você não sabe o que vem, apenas sente." },
            { nome: "Primeiro Encontro", desc: "Vocês fingem que não se conhecem, se encontram na sala e conversam como estranhos tentando se seduzir pela primeira vez." },
            { nome: "Espelho, Espelho", desc: "Transar na frente do espelho, mas o foco é você se olhar sendo tocada, validando o seu próprio corpo." },
            { nome: "Slow Motion", desc: "Tudo deve ser feito em câmera lenta. O beijo, o toque, a penetração. A proibição da velocidade aumenta a urgência interna." }
        ]
    },
    2: {
        titulo: "O Explorador",
        subtitulo: "Aprofundamento / Brinquedos e Tecnologia",
        descricao: "A curiosidade assume o controle. O foco é ampliar o orgasmo usando tecnologia e novos estímulos. O tesão vem da novidade e de descobrir que o corpo pode sentir coisas que a \"biologia sozinha\" não entrega.",
        brinquedos: [
            { nome: "Sugador de clitóris", desc: "Foco total na intensidade e rapidez do orgasmo feminino." },
            { nome: "Vibrador remote (ovo)", desc: "Introduz a brincadeira de controle à distância (dentro de casa)." },
            { nome: "Plug anal iniciante", desc: "Quebra o tabu da \"porta dos fundos\" e da sensação de preenchimento." },
            { nome: "Vibrador Wand (Varinha)", desc: "Potência pura para massagem muscular que vira erótica." },
            { nome: "Algemas de pelúcia/velcro", desc: "Restrição simbólica, fácil de tirar, apenas para a sensação de \"preso\"." }
        ],
        roupas: [
            { nome: "Body de renda cavado", desc: "Peça única que valoriza as curvas e facilita o acesso." },
            { nome: "Corselet leve", desc: "Modela a cintura e traz uma estética visual mais elaborada." },
            { nome: "Gargantilha delicada", desc: "Um acessório que começa a marcar o pescoço como zona erógena." },
            { nome: "Meia arrastão", desc: "Textura mais agressiva e visualmente estimulante." },
            { nome: "Saia colegial/temática", desc: "Introdução leve ao roleplay visual sem ser uma fantasia completa." }
        ],
        fantasias: [
            { nome: "O Controle é Seu", desc: "Ele usa o vibrador em você, controlando quando você goza e em qual velocidade, tirando a responsabilidade de você." },
            { nome: "Lugar Proibido (em casa)", desc: "Transar na cozinha, na lavanderia ou na varanda (escondidos). O risco é zero, mas a quebra da regra \"quarto\" excita." },
            { nome: "Voyeurismo Digital", desc: "Vocês filmam uma parte do ato (sem rosto) apenas para assistirem juntos logo depois e apagarem. O tesão é se ver \"de fora\"." },
            { nome: "A Boneca", desc: "Você fica passiva, ele te move, te veste ou te despe como quer. O prazer está na passividade total." },
            { nome: "Strip-tease Privado", desc: "Você coloca uma música e dança para ele. Não precisa ser profissional, o foco é ele te desejar enquanto não pode te tocar." }
        ]
    },
    3: {
        titulo: "O Ousado",
        subtitulo: "Limites / Poder e Dor Leve",
        descricao: "Entrada no mundo do poder e controle. O tesão vem da hierarquia: alguém manda, alguém obedece. Envolve confiança para testar dor leve (spanking) e restrições que começam a ser psicológicas, não só físicas.",
        brinquedos: [
            { nome: "Paddle ou Chibata de couro", desc: "Para introduzir o impacto e a marca na pele (bumbum)." },
            { nome: "Algemas de metal ou couro", desc: "Restrição real, onde você não solta sozinha." },
            { nome: "Mordaça (Gag) ball", desc: "Silencia a voz, forçando a submissão e o foco na sensação física." },
            { nome: "Venda blackout total", desc: "Bloqueio visual completo para aumentar a vulnerabilidade." },
            { nome: "Grampos de mamilo", desc: "Dor pontual que se transforma em prazer intenso." }
        ],
        roupas: [
            { nome: "Conjunto de Vinil/Látex", desc: "A estética do fetiche, o cheiro e o barulho do material excitam." },
            { nome: "Botas de cano alto/Salto fino", desc: "Símbolo de autoridade ou de destaque das pernas." },
            { nome: "Coleira de couro", desc: "Não é mais estética, é um símbolo de quem detém o controle." },
            { nome: "Lingerie com tiras (Strappy)", desc: "Moldura o corpo como se fosse um pacote a ser aberto." },
            { nome: "Chicote na mão", desc: "Acessório de poder para quem está no comando." }
        ],
        fantasias: [
            { nome: "A Entrevista", desc: "Ele é uma autoridade (chefe, policial) e você está em apuros. O sexo é uma negociação de poder e punição." },
            { nome: "Negação (Edging)", desc: "Ele te leva à beira do orgasmo e para. Repetidas vezes. Você implora, mas ele decide quando (e se) você goza." },
            { nome: "O Objeto", desc: "Você é tratada não como parceira, mas como um objeto de prazer dele. Sem beijos românticos, apenas uso intenso e focado." },
            { nome: "Exibicionismo na Janela", desc: "Transar com a janela aberta ou no carro em lugar deserto. A chance real de ser visto é o gatilho." },
            { nome: "Marcação de Território", desc: "Palmadas que deixam a pele vermelha ou chupões em lugares visíveis (se permitido). A dor vira a lembrança do ato no dia seguinte." }
        ]
    },
    4: {
        titulo: "O Aventureiro",
        subtitulo: "Hotwife / Cuckold Leve",
        descricao: "O tesão aqui é o jogo mental: você se sentir desejada por outros, e ele sentir orgulho + excitação por ser \"o dono do segredo\". Tudo gira em torno de roteiro e limites bem claros.",
        brinquedos: [
            { nome: "Controle remoto avançado", desc: "Para ser estimulada à distância, intensificando a adrenalina do risco." },
            { nome: "Consolo realístico \"terceiro\"", desc: "Objeto para fantasia, simulando a presença de outro, mas mantido privado." },
            { nome: "Coleira + guia (estética)", desc: "Para introduzir o simbolismo de posse e controle no jogo de poder." },
            { nome: "Kit amarração leve", desc: "Para criar a vulnerabilidade controlada do seu parceiro (Cuckold)." },
            { nome: "Masturbador masculino topo", desc: "Para o Cuckold focar em seu prazer enquanto ela explora o poder." }
        ],
        roupas: [
            { nome: "Vestido preto transparente com lingerie aparente", desc: "Sugere exposição controlada sem ser vulgar." },
            { nome: "Vestido curto vinho colado", desc: "Look de alto impacto que atrai olhares externos." },
            { nome: "Saia preta micro + meia 7/8", desc: "Visual sedutor que facilita a adrenalina da exposição sutil." },
            { nome: "Salto alto fino preto", desc: "Confere poder e postura, elevando a auto-confiança (persona)." },
            { nome: "Strappy/arnês discreto por baixo do look", desc: "Adiciona um segredo pessoal de kink que só o casal conhece." }
        ],
        fantasias: [
            { nome: "Exposição Controlada (Troféu)", desc: "Você usa um look que provoca sem pedir desculpas. Ele vê as reações externas e você devolve o olhar excitado dele, celebrando o poder do seu desejo." },
            { nome: "Date Solo Roteirizado", desc: "Você sai sozinha, manda 2–3 mensagens curtas (\"me olharam\", \"eu sustentei\", \"tô voltando perigosa\") e volta pra ele com o clima pronto." },
            { nome: "Cena da Porta no Hotel", desc: "Você simula uma \"cena de retorno\" na porta — não é sobre o que houve lá fora, mas sobre o papel. Você volta rindo, como quem acabou de acender um fósforo." },
            { nome: "Casa de Swing como Passeio", desc: "Vocês vão pelo ambiente, roupa, música, gente se exibindo. Vocês não \"precisam\" fazer nada; só absorver o clima e ir embora com o tesão acumulado." },
            { nome: "Relato Guiado", desc: "Você conta uma cena imaginada (olhando nos olhos, pausando, aumentando detalhes) do jeito que ele gosta, focando no prazer dele e no seu poder de narrar." }
        ]
    },
    5: {
        titulo: "O Radical",
        subtitulo: "Hotwife / Cuckold Avançado",
        descricao: "Aqui vira experiência completa: preparação, performance, suspense, \"pós-cena\" e repetição como ritual. Você não só participa — você dirige e ritualiza a noite.",
        brinquedos: [
            { nome: "Sex machine (privado)", desc: "Para uma experiência de prazer mecânico intensa, focada na performance." },
            { nome: "Cinto de castidade (dinâmica)", desc: "Usado pelo Cuckold, transformando o \"final\" em um evento raro e ritualístico." },
            { nome: "Plug avançado", desc: "Para o Cuckold manter a concentração na submissão e aumentar a excitação dela." },
            { nome: "Consolo grande/realístico", desc: "Acessório de impacto para a cena, elevando o nível de fantasia e performance." },
            { nome: "Masturbador masculino premium", desc: "Para a Hotwife controlar e recompensar a excitação do Cuckold." }
        ],
        roupas: [
            { nome: "Conjunto vinil/couro completo", desc: "Look de domínio e performance, sinalizando a personagem Hotwife." },
            { nome: "Lingerie preta de transparência forte", desc: "Aumenta a sensação de exposição e vulnerabilidade controlada." },
            { nome: "Peruca + óculos (persona)", desc: "Ajuda a criar uma personagem e separar a fantasia da realidade do casal." },
            { nome: "Salto altíssimo de impacto", desc: "Confere autoridade e transforma o andar dela em performance." },
            { nome: "Arnês/strappy completo", desc: "Visual de alto BDSM, usado como armadura de seu poder sexual." }
        ],
        fantasias: [
            { nome: "A Noite da Hotwife", desc: "Você se monta como persona (roupa, peruca, postura) e entra como se ele estivesse prestes a assistir ao que sempre desejou — você conduz tudo com calma e autoridade." },
            { nome: "Castidade como tensão", desc: "A brincadeira não é o \"final\", é o caminho — você provoca, domina, aumenta a vontade, e transforma a liberação em evento, não em rotina." },
            { nome: "Roteiro em 3 atos", desc: "(1) produção e provocação (2) suspense e controle (3) cena intensa em ambiente privado — com começo/meio/fim, como um filme." },
            { nome: "Mensagens ao vivo", desc: "Você manda áudios curtos se arrumando (\"olha a roupa\", \"olha o salto\", \"olha como eu tô\") e ele fica carregando o tesão antes mesmo de você aparecer." },
            { nome: "Debrief cinematográfico", desc: "Você volta e conta com riqueza de sensação (olhares, frases, clima, poder), e isso vira o gatilho direto para a cena final da noite." }
        ]
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
    
    // TELA DE BOAS-VINDAS
    if (tela.tipo === "boasvindas") {
        container.innerHTML = `
            <div class="tela-inicial fade-in">
                <div class="badge-18">+18</div>
                <h1>Teste de Nível<br>de Sexualidade</h1>
                <p class="subtitulo">Teste o nível do seu presente.<br>Projete o nível do seu futuro.</p>
                <p class="aviso">Este conteúdo é exclusivo para maiores de 18 anos e contém perguntas sobre intimidade, fantasias e práticas sexuais.</p>
            </div>
        `;
        btnContainer.innerHTML = `<button type="button" id="btn-iniciar">Tenho 18 anos ou mais</button>`;
        
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
