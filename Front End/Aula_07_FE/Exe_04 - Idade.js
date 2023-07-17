// Inserção da data do usuário
const data = prompt("Insira sua data de nascimento no formato dd/mm/aaaa")

// Criação da função
function idade(data) {
    // Salvar variável
    var txt = data;
    // Conseguir a data atual
    var hoje = new Date().toLocaleDateString();
    // Filtrar variável de entrada para formato apenas de números (lista)
    var numb = txt.match(/\d/g);
    // Filtrar data atual para formato apenas de números (lista)
    var hoje = hoje.match(/\d/g);
    // unir números das listas geradas 
    numb = numb.join("");
    hoje = hoje.join("");

    // Construir dia de nascimento da pessoa
    var dia = numb[0] + numb[1];
    dia = parseInt(dia);

    // Construir a data atual (dia , mês e ano)
    var dia_atual = parseInt(hoje[0] + hoje[1]);
    var mes_atual = parseInt(hoje[2] + hoje[3]);
    var ano_atual = parseInt(hoje[4] + hoje[5] + hoje[6] + hoje[7]);

    // Se o dia inserido pelo usuário é válido ( maior que 0 e menor que 31)
    if (dia >= 0 && dia <= 31) {
        // Criação da variável com  o mês de nascimento da pessoa
        var mes = numb[2] + numb[3];
        mes = parseInt(mes);

        // Verificação se o mês inserido pelo usuário é valido (maior que 0 e menor que 12)
        if (mes >= 0 && mes <= 12) {
            // Criação da variável com o ano de nascimento da pessoa
            var ano = numb[4] + numb[5] + numb[6] + numb[7];
            ano = parseInt(ano);
            
            // Se o ano inserido pelo usuário é maior que o ano atual, a função termina
            if (ano > ano_atual) {
                return
            }
            // Se o ano inserido pelo usuário for válido (maior ou igual que o ano atual)
            if (ano_atual >= ano) {
                // Se o ano atual é igual ao ano de nascimento da pessoa, sua idade é 0;
                if (ano_atual == ano) {
                    var ano_pessoa = 0;
                }
                // Se não, a idade em anos é dada pela diferença dos anos
                else {
                    var ano_pessoa = ano_atual - ano;
                }
                // Se o mes de aniversário da pessoa é maior que o mes atual
                if (mes_atual < mes) {
                    // A idade da pessoa (mes) é dada pela fórmula  -> (12 - mes de aniversário) + mes atual
                    var mes_pessoa = (12 - mes) + mes_atual;
                    // A idade da pessoa (dia) é dada pela fórmula  -> (31 - (dia + 1))
                    var dia_pessoa = 31 - (dia + 1);
                    // Se o mês de aniversário da pessoa é maio que o mes atual, significa que ela ainda não fez aniversário esse ano
                    // logo, a idade tem que ser reduzida em 1 unidade
                    ano_pessoa = ano_pessoa - 1;
                }
                // Se o mes atual for maior que o mes de aniversário
                else if (mes_atual > mes) {
                    // A idade (mes) da pessoa é igual a diferença dos meses
                    var mes_pessoa = mes_atual - mes;
                    // Se o dia atual for maior ou igual que o dia de aniversário da pessoa
                    if (dia_atual >= dia) {
                        // A idade da pessoa (dias) é igual a diferença dos dias
                        dia_pessoa = dia_atual - dia;
                    }
                    // Se não, a idade da pessoa (dias) é igual ao dia atual
                    else {
                        dia_pessoa = dia_atual;
                    }
                }
                // Se o mes atual for igual ao mes de aniversário da pessoa
                else if (mes_atual == mes){
                    // A idade da pessoa (mes) é igual a diferença
                    var mes_pessoa = mes_atual - mes;
                    // Se o dia atual for maior ou igual que o dia de aniversário da pessoa
                    if (dia_atual >= dia) {
                        // A idade da pessoa (dias) é igual a diferença dos dias
                        dia_pessoa = dia_atual - dia;
                    }
                    // Se não
                    else {
                        // A idade da pessoa (mes) é igual a 12 e a idade da pessoa (dias) é igual ao dia atual
                        dia_pessoa = dia_atual;
                        mes_pessoa = 12;
                    }
                }
                // Imprime a idade da pessoa -> Ano, mes e dia
                console.log("Idade -> " + ano_pessoa + " anos, " + mes_pessoa + " meses e " + dia_pessoa + " dias.")
            }
        }
        else {
            return
        }
    }
    else {
        return
    }
}

idade(data);