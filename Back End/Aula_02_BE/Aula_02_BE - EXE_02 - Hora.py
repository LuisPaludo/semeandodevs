import math

seg = float(input("Insira  valor de segundos a serem convertidos: "))

min = seg/60

h = min/60
h_int = int(h)
h_resto = h - h_int

min_h = 60*h_resto
min_int = int(min_h)
min_resto = min_h - min_int

seg_min = round(60*min_resto)
seg_int = int(seg_min)

print("A conversão resulta em:", h_int,"horas",min_int,"minutos e",seg_int,"segundos.")

