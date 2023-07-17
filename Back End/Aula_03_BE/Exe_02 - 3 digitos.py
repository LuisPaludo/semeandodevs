n = input("Digite um número: ")

n_list = list(n)
n_size = int(len(n_list))

if n_size == 3:
    print("O número digitado possui 3 dígitos.")
else:
    print("O número digitado não possui 3 dígitos, possui",n_size,"dígitos.")
