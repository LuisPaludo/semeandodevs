m = int(input("Digite um número de 1 a 12: "))

if m == 1:
    mes = 'Janeiro'
    dias = '31'
elif m == 2:
    mes = 'Fevereiro'
    dias = '28'
elif m == 3:
    mes = 'Março'
    dias = '31'
elif m == 4:
    mes = 'Abril'
    dias = '30'
elif m == 5:
    mes = 'Maio'
    dias = '31'
elif m == 6:
    mes = 'Junho'
    dias = '30'
elif m == 7:
    mes = 'Julho'
    dias = '31'
elif m == 8:
    mes = 'Agosto'
    dias = '31'
elif m == 9:
    mes = 'Setembro'
    dias = '30'
elif m == 10:
    mes = 'Outubro'
    dias = '31'
elif m == 11:
    mes = 'Novembro'
    dias = '30'
elif m == 12:
    mes = 'Dezembro'
    dias = '30'
else:
    print("Digite um número na escala indicada.")

print("O número",m,"equivale ao mês de",mes,"que possui",dias,"dias.")