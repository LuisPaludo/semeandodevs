x = float(input("Digite a coordenada em X: "))
y = float(input("Digite a coordenada em Y: "))

if x > 0 and y > 0:
    print("A coordenada está no primeiro quadrante.")
elif x < 0 and y > 0:
    print("A coordenada está no segundo quadrante.")
elif x < 0 and y < 0:
    print("A coordenada está no terceiro quadrante.")
elif x > 0 and y < 0:
    print("A coordenada está no quarto quadrante.")