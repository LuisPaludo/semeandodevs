import Myfunc

# Devolver nome do estado através do UF
print("\nUF -> Estado")
Estado = 'PR'
Estado_Nome = Myfunc.retorna_estado(Estado)
print(Estado, '->', Estado_Nome)

# Devolver apenas os números de uma frase
print("\nFrase -> Número")
Frase = '853@#%Auasdhuhas95216aiusiduhia@@#!'
Numero_Frase = Myfunc.retorna_numero(Frase)
print(Frase, '->', Numero_Frase)

# Validar CEP
print("\nValidação de CEP")
CEP = '85.530-000'
CEP_inv = '855.530-000'
Teste_CEP = Myfunc.valida_CEP(CEP)
Teste_CEP_inv = Myfunc.valida_CEP(CEP_inv)
print(CEP, '->' ,Teste_CEP)
print(CEP_inv, '->', Teste_CEP_inv)

# Validar CNPJ
print("\nValidação de CNPJ")
CNPJ = '44.072.128/0001-36'
CNPJ_inv = '44.075.128/0001-36'
Teste_CNPJ = Myfunc.valida_CNPJ(CNPJ)
Teste_CNPJ_inv = Myfunc.valida_CNPJ(CNPJ_inv)
print(CNPJ, '->', Teste_CNPJ)
print(CNPJ_inv, '->', Teste_CNPJ_inv)

# Validar CPF
print("\nValidação de CPF")
CPF = '095.409.729-73'
CPF_inv = '195.409.729-73'
Teste_CPF = Myfunc.valida_CPF(CPF)
Teste_CPF_inv = Myfunc.valida_CPF(CPF_inv)
print(CPF, '->', Teste_CPF)
print(CPF_inv, '->', Teste_CPF_inv)

# Validar Data
print("Validação de Data")
Data_1 = '13-05-2023'
Data_2 = '2023/05/13'
Data_1_inv = '32-13-2023'
Data_2_inv = '2023/13/32'
Teste_Data_1 = Myfunc.valida_data(Data_1)
Teste_Data_2 = Myfunc.valida_data(Data_2)
Teste_Data_1_inv = Myfunc.valida_data(Data_1_inv)
Teste_Data_2_inv = Myfunc.valida_data(Data_2_inv)
print(Data_1, '->', Teste_Data_1)
print(Data_2, '->', Teste_Data_2)
print(Data_1_inv, '->', Teste_Data_1_inv)
print(Data_2_inv, '->', Teste_Data_2_inv)

# Validar UF
print("\nValidação de UF")
UF = 'PR'
UF_inv = 'PT'
Teste_UF = Myfunc.valida_UF(UF)
Teste_UF_inv = Myfunc.valida_UF(UF_inv)
print(UF, '->', Teste_UF)
print(UF_inv, '->', Teste_UF_inv)