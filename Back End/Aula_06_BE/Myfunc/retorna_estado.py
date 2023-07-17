# Definição da função. O argumento esperado é sempre uma string, e o resultado da função também será uma string
def retorna_estado(a:str)->str:

    # Criação de um dicionário, relacionando UF com o nome do estado
     dic_UF = {'AC':'Acre', 'AL':'Alagoas', 'AP':'Amapá', 'AM':'Amazonas', 'BA':'Bahia', 'CE':'Ceará',
               'DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão', 'MT':'Mato Grosso',
               'MS':'Mato Grosso do Sul', 'MG':'Minas Gerais', 'PA':'Pará', 'PB':'Paraíba', 'PR':'Paraná',
               'PE':'Pernambuco', 'PI':'Piauí', 'RJ':'Rio de Janeiro', 'RN':'Rio Grande do Norte',
               'RS':'Rio Grande do Sul', 'RO':'Rondônia', 'RR':'Roraima', 'SC':'Santa Catarina',
               'SP':'São Paulo', 'SE':'Sergipe', 'TO':'Tocantins'}

     # Resposta padrão para caso uma UF inválida seja inserida. res é a variável de saída
     res = 'Inválido'
     
     # Saída da função
     return dic_UF.get(a)

