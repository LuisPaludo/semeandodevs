from unittest.mock import Mock, patch

from django.forms import ValidationError
from django.test import TestCase
from rest_framework.test import APIRequestFactory, APITestCase
from model_bakery import baker

from clientes.models import validate_cpf, Cliente
from clientes.views import EnderecoView
from services.services import CepService
# Create your tests here.

mock_service = {
    'cep': '85501-352',
    'logradouro': 'Rua Governador Jorge Lacerda',
    'complemento': 'de 321/322 ao fim',
    'bairro': 'Trevo da Guarany',
    'localidade': 'Pato Branco',
    'uf': 'PR',
    'ibge': '4118501',
    'gia': '',
    'ddd': '46',
    'siafi': '7751'
}

class TestCLiente(TestCase):
    def setUp(self) -> None:
        return super().setUp()
    
    def test_valida_cpf_valido(self):
        cpf = '63945765064'
        saida = validate_cpf(cpf)
        self.assertEqual(saida,'639.457.650-64')

    def test_valida_cpf_invaludo(self):
        cpf = '63945765063'
        with self.assertRaisesMessage(ValidationError, 'CPF Inválido'):
            validate_cpf(cpf)

class TestEnderecoView(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.cliente = baker.make(Cliente)
        self.dados = {
            'cliente':self.cliente.id,
            'cep': '85501352',
            'numero': 200
        }
    
    def _post_request(self,data):
        request = self.factory.post('/clientes/enderecos/', data = data, format = 'json')
        view = EnderecoView.as_view({'post': 'create'})
        return view(request)

    @patch.object(CepService, 'consultar_cep', Mock(return_value=mock_service))
    def test_create_campos_endereco_preenchidos(self):
        resposta = self._post_request(self.dados)
        self.assertEqual(resposta.data['rua'], 'Rua Governador Jorge Lacerda')
        self.assertEqual(resposta.data['cidade'], 'Pato Branco')
        self.assertEqual(resposta.data['uf'], 'PR')
