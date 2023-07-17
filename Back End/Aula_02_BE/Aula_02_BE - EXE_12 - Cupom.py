# Criação de um dicionário para referência de cupons de desconto
cd_db = {'APP5':0.05,'APP10':0.1,"APP15":0.15,"APP20":0.2}

# Coleta de dados do usuário, valor de compra (vc) e cupom de desconto (cd)
vc = float(input("Informe o valor da compra (em R$): "))
cd = input("Informe o cupom de desconto: ")

# Conversão da string para caixa alta
cd = cd.upper()

# Cálculo do valor com desconto aplicdo
vc_cd = (1 - cd_db[cd])*vc

# Impressão do resultado
print("Cupom aplicado com sucesso! Sua compra fica com o valor final de R$",vc_cd,"Reais.\nO cupom",cd,"gerou uma economia de R$",vc*cd_db[cd],"Reais")

