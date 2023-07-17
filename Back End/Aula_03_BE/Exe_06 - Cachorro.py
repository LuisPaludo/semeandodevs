i = float(input("Digite a idade de seu cachorro:"))

if i <= 2:
    ic = i*10.5
    ic_int = int(ic)
    ic_m = ic - ic_int
    m = int(ic_m*12)
else:
    ic = 2*10.5 + (i-2)*4
    ic_int = int(ic)
    ic_m = ic - ic_int
    m = int(ic_m*12)

print("A idade do cachorro, equivalente em anos humanos é:",ic_int,"anos e",m,"meses.")

