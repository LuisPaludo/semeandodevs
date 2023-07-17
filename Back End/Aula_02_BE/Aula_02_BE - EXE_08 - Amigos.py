premio = float(500000)

primeiro = "R${:,.2f}".format(0.35*premio)
segundo = "R${:,.2f}".format(0.4*premio)
terceiro = "R${:,.2f}".format((1-0.4-0.35)*premio)

print("O primeiro amigo receberá ",primeiro," reais, o segundo receberá ",segundo," reais e o terceiro ",terceiro," reais")