## Definição da classe Pai Polígono
class Poligono:
    def __init__(self, num_lados):
        self.num_lados = num_lados
        self.lados = []
    
    def adiciona_lado(self, lado):
        if len(self.lados) < self.num_lados:
            self.lados.append(lado)
        else:
            print("Número máximo de lados atingido.")
    
    def imprime(self):
        print("Número de lados: ", self.num_lados)
        for i,l in enumerate(self.lados):
            print(f'Lado {i + 1}: {l}')

# Definição da Classe Triângulo, herdando da classe Polígono
class Triangulo(Poligono):
    # Inicialização da classe triângulo
    def __init__(self):
        # Número de lados é fixo para o triângulo
        self.num_lados = 3
        # Array vazia para os lados
        self.lados = []
    
    # Validação da classe triângulo
    def valida_triangulo(self):
        # Primeira verificação: O número de lados inseridos é 3
        if len(self.lados) == self.num_lados:
            # Se A < (B + C) e B < (A + C) e C < (A + B) -> True , caso contrário -> False
            if ((self.lados[0]) < (self.lados[1] + self.lados[2])) and ((self.lados[1]) < (self.lados[0] + self.lados[2])) and ((self.lados[2]) < (self.lados[0] + self.lados[1])):
                return True
            else:
                return False
        else:
            return False
    
    # Classificação do triângulo
    def tipo(self):
        # Apenas entra na função se o triângulo é validado
        if self.valida_triangulo():
            # Caso todos os lados sejam diferentes -> Escaleno
            if self.lados[0] != self.lados[1] and self.lados[0] != self.lados[2] and self.lados[1] != self.lados[2]:
                print("Triângulo Escaleno")
            # Caso todos os lados sejam iguais -> Equilátero
            elif self.lados[0] == self.lados[1] and self.lados[0] == self.lados[2] and self.lados[1] == self.lados[2]:
                print("Triângulo Equilátero")
            # Se todos os lados não são diferentes, também não são todos iguais, então ao menos temos dois lados iguais -> Isóceles
            else:
                print("Triângulo Isóceles")
        else:
            print("Não é um triângulo")

    # Função adiciona lado sobrescrita
    def adiciona_lado(self, lado):
        if len(self.lados) < 2:
            self.lados.append(lado)
        # Caso o número de dados inseridos no triângulo for igual a 2, significa que o terceiro lado está sendo inserido
        elif len(self.lados) == 2:
            # Se Lado_novo < (A + B) então permite adicionar
            if lado < (self.lados[0] + self.lados[1]):
                self.lados.append(lado)
            # Caso contrário -> Retorna a mensagem de lado inválido
            else:
                print("Valor para lado Inválido")

    # Nova função imprime
    def imprime(self):
        # Se é um triângulo
        if self.valida_triangulo():
            # Imprime o tipo
            self.tipo()
            # os valores de cada lado
            for i,l in enumerate(self.lados):
                print(f'Lado {i + 1}: {l}')

# p = Poligono(5)
# p.adiciona_lado(2)
# p.adiciona_lado(3)
# p.adiciona_lado(5)
# p.adiciona_lado(4)
# p.imprime()

t = Triangulo()
t.adiciona_lado(1)
t.adiciona_lado(1)
t.adiciona_lado(1)
# t.valida_triangulo()
# t.tipo()
t.imprime()
