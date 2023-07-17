# Importação da biblioteca para tratamento de arquivos CSV
import csv

# Criação da classe aluno
class Aluno:
    ## Construtor da classe Aluno, serão recebidos 4 dados diferentes da tabela
    def __init__(self,Nome:str,Sobrenome:str,Nota_1:float,Nota_2:float):
        ## Teste para descobrir se há um nome válido fornecido ao construtor
        if Nome == '':
            self.Nome = None
        else:
            self.Nome = Nome

        ## Teste para descobrir se há um sobrenome válido fornecido ao construtor
        if Sobrenome == '':
            self.Sobrenome = None
        else:
            self.Sobrenome = Sobrenome

        ## Teste para descobrir se há uma nota válido fornecida ao construtor
        try:
            self.Nota_1 = float(Nota_1)
        except:
            self.Nota_1 = None
        try:
            self.Nota_2 = float(Nota_2)
        except:
            self.Nota_2 = None

    # Criação da função para calcular a média
    def media(self):
            # tentativa, se alguma das notas possuir o valor "None", vai direto para a exceção
            try:
                # Se a nota 1 está dentro do intervalo desejado
                if(self.Nota_1 >= 0 and self.Nota_1 <= 10):
                    # E a nota 2 também
                    if(self.Nota_2 >= 0 and self.Nota_2 <= 10):
                        # calcula a média das notas
                        avg = (self.Nota_1 + self.Nota_2)/2
                        # retorna o resultado
                        return avg
                    # Caso a nota 2 esteja fora do intervalo aceito
                    else:
                        # indica ao usuário a seguinte mensagem
                        return 'Nota 2 fora do intervalo aceito(0 - 10)'
                # Caso a nota 1 esteja fora do intervalo, precisamos descobrir se a nota 2 também está
                elif (self.Nota_2 >= 0 and self.Nota_2 <= 10):
                    # Caso positivo (Nota 2 está dentro do intervalo), fornece a seguinte mensagem ao usuário
                    return 'Nota 1 fora do intervalo aceito (0 - 10)'
                # Caso a nota 1 e a nota 2 estejam foram do intervalo, comunica o usuário
                else:
                    return 'Notas 1 e 2 fora do intervalo aceito (0 - 10)'
            # Em caso de alguma das notas não terem sido fornecidas ao construtor
            except:
                # Se ambas as notas estão ausentes
                if self.Nota_1 == None and self.Nota_2 == None:
                    # Comunica o usuário
                    return 'Nota 1  e Nota 2 Ausentes, impossível calcular'
                # Se apenas a primeira nota está ausente
                elif self.Nota_1 == None and self.Nota_2 != None:
                    # Comunica o usuário
                    return 'Nota 1 Ausente, impossível calcular'
                # Se apenas a segunda nota está ausente
                else:
                    # Comunica o usuário
                    return 'Nota 2 Ausente, impossível calcular'
                
    # Função para impressão do nome completo do aluno
    def Imprime_nome_completo(self):
        # Tentativa: Caso nenhum dos dados de entrada (nome e sobrenome) possuam o valor de 'None'
        try:
            # Retorna o nome concatenado
            return print('Nome completo -> ' + self.Nome + ' ' + self.Sobrenome)
        # Exceção: Uma entrada possui valor inválido
        except:
            # Se for o nome e o sobrenome inválidos
            if(self.Nome == None and self.Sobrenome == None):
                # informa o usuário
                return print("Nome e Sobrenome ausentes")
            # Se apenas o nome possui entrada inválida
            elif(self.Nome == None and self.Sobrenome != None):
                # Comunica o usuário
                return print("Nome ausente -> Sobrenome: " + self.Sobrenome)
            # Se apenas o sobrenome possui entrada inválida
            else:
                # Comunica o usuário
                return print(self.Nome + " -> Sobrenome ausente")

# Função para leitura de arquivo csv e criação de uma lista de objetos da classe Aluno
def Cria_alunos():
    # Definição da lista vazia
    Alunos = []
    # Função para abrir o arquivo de leitura csv
    with open('Back_end\Aula_08_BE\Db.csv','r') as arquivo:
        # Para cada uma das linhas presentes no "arquivo"
        for row in csv.DictReader(arquivo):
            # Adiciona a lista alunos um objeto da clase Aluno com as informações contidas na linha do arquivo
            Alunos.append(Aluno(row['nome'],row['sobrenome'],row['nota_1'],row['nota_2']))
    # Retorna a lista de objetos criados
    return Alunos

# Chamada da função
Sala = Cria_alunos()

# Impressão dos Resultados
for aluno in Sala:
    aluno.Imprime_nome_completo()
    print(aluno.media())
