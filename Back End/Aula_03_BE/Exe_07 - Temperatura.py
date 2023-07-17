t = float(input("Digite a temperatura em Celsius: "))
c = input("Digite k ou K para converter para Kelvin e f ou F para converter em Farenheit: ")

if c == 'k' or c == 'K':
    t_c = t + 273
    s = 'Kelvin'
    un = 'K'
elif c == 'f' or c == 'F':
    t_c = t*1.8 + 32
    s = 'Farenheit'
    un = '°F'
else:
    print("Digite uma conversão válida.")

print("A temperatura convertida para",s,"é",t_c,un)
