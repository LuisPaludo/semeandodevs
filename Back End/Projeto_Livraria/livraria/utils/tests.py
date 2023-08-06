from django.test import TestCase
from utils.utils import _retorna_digitos, valida_cpf, mascara_cpf

class TestUtils(TestCase):
    def setUp(self) -> None:
        self.cpf= '711.730.380-86'
    
    def test_retorna_digitos_quando_string_contem_digitos(self):
        entrada = self.cpf
        saida = _retorna_digitos(entrada)
        self.assertEqual(saida,'71173038086')
        pass

    def test_retorna_none_quanto_entrada_for_diferente_de_str(self):
        saida = _retorna_digitos(123)
        self.assertIsNone(saida)

    def test_retorna_string_vazia_quando_nao_contem_digitos(self):
        saida = _retorna_digitos('abcde')
        self.assertEqual(saida,'')

    def test_retorna_false_cpf_invalido(self):
        self.cpf = '711.730.380-85'
        saida = valida_cpf(self.cpf)
        self.assertFalse(saida)

    def test_retorna_true_cpf_valido(self):
        saida = valida_cpf(self.cpf)
        self.assertTrue(saida)

    def test_mascara_cpf_valido(self):
        saida = mascara_cpf(self.cpf)
        self.assertEqual(saida,self.cpf)
    
    def test_mascara_retorna_none_cpf_invalido(self):
        self.cpf = '711.730.380-85'
        saida = mascara_cpf(self.cpf)
        self.assertIsNone(saida)

        



