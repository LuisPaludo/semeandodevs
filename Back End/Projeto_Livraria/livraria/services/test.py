from unittest import skip

from django.test import TestCase

from services.services import CepService

class TestCepService(TestCase):
    def setUp(self):
        self.service = CepService()

    @skip('Acessa API externa')
    def test_consultas_cep(self):
        resposta = self.service.consultar_cep('01001-000')
        self.assertEqual(resposta.get('logradouro'), 'Praça da Sé')