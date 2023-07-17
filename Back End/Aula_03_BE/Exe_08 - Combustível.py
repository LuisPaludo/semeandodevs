g = float(input("Digite quantos litros foram vendidos: "))
t = input("Digite a ou A para álcool e g ou G para gasolina: ")
p = float(input("Digite o preço do combustível: "))

if t == 'a' or t == 'A':
    tp = 'Álcool'
    if g <= 20:
        v = p*(0.97)*g
    else:
        v = p*(0.95)*g

elif t == 'g' or t == 'G':
    tp = 'Gasolina'
    if g <= 20:
        v = p*(0.96)*g
    else:
        v = p*(0.94)*g

else:
    print("Digite um tipo de combustível válido.")

print("O tipo de combustível selecionado foi",tp,"e o valor da compra é de R$","%.2f" % v,"Reais.")