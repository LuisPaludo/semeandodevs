# Generated by Django 4.2.3 on 2023-07-18 18:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('livros', '0003_livro_autor'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='autor',
            options={'verbose_name_plural': 'Autores'},
        ),
    ]
