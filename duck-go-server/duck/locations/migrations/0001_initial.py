# Generated by Django 4.2.4 on 2023-08-20 18:29

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import user_data.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('resume', models.TextField()),
                ('description', models.TextField()),
                ('location_link', models.URLField(default='', max_length=255)),
                ('map_link', models.URLField(default='', max_length=255)),
                ('coordinates_lat', models.CharField(default='', max_length=255)),
                ('coordinates_long', models.CharField(default='', max_length=255)),
                ('slug_field', models.SlugField(blank=True, default='', null=True)),
                ('locations_photo', models.ImageField(blank=True, max_length=500, null=True, upload_to='users_photos', validators=[user_data.models.validate_image_size])),
                ('photo_1', models.ImageField(blank=True, max_length=500, null=True, upload_to='users_photos', validators=[user_data.models.validate_image_size])),
                ('photo_2', models.ImageField(blank=True, max_length=500, null=True, upload_to='users_photos', validators=[user_data.models.validate_image_size])),
                ('photo_3', models.ImageField(blank=True, max_length=500, null=True, upload_to='users_photos', validators=[user_data.models.validate_image_size])),
            ],
        ),
        migrations.CreateModel(
            name='TuristicPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('resume', models.TextField()),
                ('description', models.TextField()),
                ('numbers_qrcode', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('qr_code', models.CharField(max_length=255, unique=True)),
                ('coordinates_lat', models.CharField(default='', max_length=255)),
                ('coordinates_long', models.CharField(default='', max_length=255)),
                ('points', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='location_points', to='locations.location')),
            ],
        ),
    ]
