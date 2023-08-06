from http.client import ResponseNotReady
from model_bakery import baker
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK

from django.test import TestCase

from livros.models import Livro
from clientes.models import Cliente
from pedidos.models import Cupom, Pedido, PedidoLivro
from pedidos.views import PedidoView

class TestPedidoView(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.cliente = baker.make(Cliente)
        self.livro = baker.make(Livro)
        self.dados = {
            'cliente': self.cliente.id, # type: ignore
            'livros': [
                {
                    'livro': self.livro.id, # type: ignore
                    'quantidade': 2
                }
            ]
        }

    def _post_request(self, data):
        request = self.factory.post('/pedidos/pedidos/', data, format='json')
        view = PedidoView.as_view({'post': 'create'})
        return view(request)
    
    def _put_request(self, data, pk):
        request = self.factory.put(f'/pedidos/pedidos/{pk}/', data, format= 'json')
        view = PedidoView.as_view({'put': 'update'})
        return view(request, pk=pk)
    
    def test_create_pedido_cupom_invalido(self):        
        self.dados['cupom'] = 'app10'
        resposta = self._post_request(self.dados)
        self.assertEqual(resposta.status_code, HTTP_400_BAD_REQUEST)
        self.assertEqual(resposta.data['cupom'], ['Cupom Inválido'])

    def test_create_pedido_sucesso(self):        
        resposta = self._post_request(self.dados)
        self.assertEqual(resposta.status_code, HTTP_201_CREATED)

    def test_create_cupom_expirado(self):
        cupom = baker.make(Cupom, nome='app10', quantidade_maxima=10, quantidade_utilizada=10)  # noqa: E501
        self.dados['cupom'] = cupom.nome
        resposta = self._post_request(self.dados)
        self.assertEqual(resposta.status_code, HTTP_400_BAD_REQUEST)
        self.assertEqual(resposta.data['cupom'], ['Cupom Expirado'])

    def test_update_cupom_invalido(self):
        pedido = baker.make(Pedido, cliente=self.cliente)
        baker.make(PedidoLivro, pedido=pedido, livro = self.livro, quantidade = 2)
        self.dados['cupom'] = 'app10'
        resposta = self._put_request(self.dados, pedido.id)
        self.assertEqual(resposta.data['cupom'], ['Cupom Inválido'])
        self.assertEqual(resposta.status_code, HTTP_400_BAD_REQUEST)
        
    def test_update_cupom_expirado(self):
        pedido = baker.make(Pedido, cliente=self.cliente)
        baker.make(PedidoLivro, pedido=pedido, livro = self.livro, quantidade = 2)
        cupom = baker.make(Cupom, nome='app10', quantidade_maxima=10, quantidade_utilizada=10)  # noqa: E501
        self.dados['cupom'] = cupom.nome
        resposta = self._put_request(self.dados, pedido.id)
        self.assertEqual(resposta.status_code, HTTP_400_BAD_REQUEST)
        self.assertEqual(resposta.data['cupom'], ['Cupom Expirado'])

    def test_create_atualiza_quantidade_cupom(self):
        cupom = baker.make(Cupom, nome='app10', quantidade_maxima=10, quantidade_utilizada=5)
        self.dados['cupom'] = cupom.nome
        resposta = self._post_request(self.dados)
        self.assertEqual(resposta.status_code, HTTP_201_CREATED)
        cupom = Cupom.objects.get(id=cupom.id)
        self.assertEqual(cupom.quantidade_utilizada, 6)

    def test_update_atualiza_quantidade_cupom(self):
        cupom_original = baker.make(Cupom)
        cupom_novo = baker.make(Cupom, nome='app20', quantidade_maxima=10, quantidade_utilizada=5)
        pedido = baker.make(Pedido, cupom=cupom_original)
        self.dados['cupom'] = cupom_novo.nome
        resposta = self._put_request(self.dados, pedido.id)
        cupom_novo = Cupom.objects.get(id=cupom_novo.id)
        self.assertEqual(resposta.status_code, HTTP_200_OK)
        self.assertEqual(cupom_novo.quantidade_utilizada,6)

class TestPedido(TestCase):
    def setUp(self)-> None:
        self.livro_1 = baker.make(Livro, valor=10)
        self.livro_2 = baker.make(Livro, valor=20)
        self.cliente = baker.make(Cliente)
        self.cupom = baker.make(Cupom, percentual_desconto=10, desconto_maximo=10)
        self.pedido = baker.make(Pedido)

    def test_calcular_total_pedido_sem_cupom_igual_a_40(self):
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_1, quantidade=2)
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_2, quantidade=1)
        saida = self.pedido.calcular_total()
        self.assertEqual(saida,40)
        
    def test_calcular_total_pedido_com_cupom_igual_a_110(self):
        self.pedido.cupom = self.cupom
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_1, quantidade=4)
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_2, quantidade=4)
        saida = self.pedido.calcular_total()
        self.assertEqual(saida,110)

    def test_calcular_total_pedido_com_cupom_igual_a_90(self):
        self.pedido.cupom = self.cupom
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_1, quantidade=4)
        baker.make(PedidoLivro, pedido=self.pedido, livro=self.livro_2, quantidade=3)
        saida = self.pedido.calcular_total()
        self.assertEqual(saida,90)

    
