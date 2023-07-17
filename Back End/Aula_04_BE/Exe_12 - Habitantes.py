 # Declaração das contantes
pop_A = 80000
pop_B = 200000

tx_A = 3/100
tx_B = 1.5/100

# Declaração do contador
cont = 0

# Loop para o cálculo de aumento populacional
while(pop_A<=pop_B):
    pop_A = pop_A*(1 + tx_A)
    pop_B = pop_B*(1 + tx_B)
    cont += 1

pop_A = "{:,.2f} habitantes".format(pop_A)
pop_B = "{:,.2f} habitantes".format(pop_B)

# Impressão do resultado
print("Serão necessários",cont,"anos para que a cidade A atinja",pop_A,"e a cidade B atinja",pop_B)