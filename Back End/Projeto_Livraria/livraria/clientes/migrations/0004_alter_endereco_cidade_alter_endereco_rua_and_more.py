# Generated by Django 4.2.3 on 2023-08-06 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_endereco'),
    ]

    operations = [
        migrations.AlterField(
            model_name='endereco',
            name='cidade',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='endereco',
            name='rua',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='endereco',
            name='uf',
            field=models.CharField(max_length=2, null=True),
        ),
    ]
