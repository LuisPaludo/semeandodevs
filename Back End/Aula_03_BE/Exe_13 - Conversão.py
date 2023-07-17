m = float(input("Digite uma distância em metros:"))
c = input("Digite:\n mm - Para converter a distância em milimetros.\n cm - Para converter a distência em centímetros.\n km - para converter a distância em kilometros.\n")

c = c.lower()

if c == 'mm':
    mc = m*1000
elif c == 'cm':
    mc = m*100
elif c == 'km':
    mc = m/1000

print(m,"metros equivalem a",mc,c)