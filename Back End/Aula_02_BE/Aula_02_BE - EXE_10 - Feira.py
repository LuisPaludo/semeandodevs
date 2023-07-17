dic_1 = {'batata':1.25,'tomate':5.00,'repolho':3.00,'abóbora':2.50}

dic_2 = {'abobrinha':4.00,'tomate':5.50,'cebola-roxa':7.25,'batata':2.40}

dk1 = dic_1.keys()
dk2 = dic_2.keys()

dk1_set = set(dk1)
dk2_set = set(dk2)

dk = dk1_set.intersection(dk2_set)

print("O elemento em comum é: ",dk)