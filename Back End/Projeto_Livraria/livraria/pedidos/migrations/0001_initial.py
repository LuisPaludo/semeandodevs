# Generated by Django 4.2.3 on 2023-07-18 19:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('livros', '0004_alter_autor_options'),
        ('clientes', '0002_alter_cliente_cpf'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
                ('livros', models.ManyToManyField(related_name='livros_pedido', to='livros.livro')),
            ],
        ),
    ]
