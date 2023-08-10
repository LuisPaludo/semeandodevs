# Generated by Django 4.2.4 on 2023-08-09 05:46

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Prizes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('code', models.CharField(max_length=20, unique=True)),
                ('discount_value', models.DecimalField(decimal_places=2, max_digits=10)),
                ('times_to_be_used', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('times_used', models.IntegerField()),
                ('generated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='generated_prizes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
