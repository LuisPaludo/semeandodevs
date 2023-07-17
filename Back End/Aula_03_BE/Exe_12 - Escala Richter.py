# Inserção da magnitude pelo usuário
mg = float(input("Digite a magnitude do terremoto: "))

# Formatação do valor inserido para possuir apenas uma casa decimal
mg = float("{:.1f}".format(mg))

# Teste lógico para descobrir em qual descrição a magnitude digitada se encaixa
if mg < 2:
    d = 'Microssismos'
elif mg >= 2 and mg < 3:
    d = 'Muito pequeno'
elif mg >=3 and mg < 4:
    d = 'Pequeno'
elif mg >= 4 and mg < 5:
    d = 'Ligeiro'
elif mg >= 5 and mg < 6:
    d = 'Moderado'
elif mg >= 6 and mg < 7:
    d = 'Forte'
elif mg >= 7 and mg < 8:
    d = 'Grande'
elif mg >= 8 and mg < 9:
    d = 'Importante'
elif mg >= 9 and mg < 10:
    d = 'Excepecional'
elif mg >=10:
    d = "Extremo"

# Impressão do resultado
print("A magnitude de",mg,"na escala Richter condiz com um abalo sísmico descrito como",d)