# Generated by Django 4.2.4 on 2023-09-07 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_data', '0008_customuser_company_name_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='company_name',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
