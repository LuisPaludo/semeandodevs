def valor_absoluto(x:float)->float:

    abs = (x**2)**0.5

    return abs

def maior(x:float,y:float)->float:

    m = (x+y + valor_absoluto(x-y))/2

    return m
