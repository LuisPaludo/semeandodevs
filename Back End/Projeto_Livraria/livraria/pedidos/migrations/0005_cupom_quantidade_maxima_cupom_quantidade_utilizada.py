# Generated by Django 4.2.3 on 2023-08-05 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0004_pedido_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='cupom',
            name='quantidade_maxima',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='cupom',
            name='quantidade_utilizada',
            field=models.IntegerField(default=0),
        ),
    ]
