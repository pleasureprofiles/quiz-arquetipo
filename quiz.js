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

    // 6
