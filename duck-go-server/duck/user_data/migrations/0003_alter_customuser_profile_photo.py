# Generated by Django 4.2.4 on 2023-08-23 07:34

from django.db import migrations, models
import user_data.models


class Migration(migrations.Migration):

    dependencies = [
        ('user_data', '0002_customuser_is_partner_alter_customuser_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_photo',
            field=models.ImageField(blank=True, default='users_photos/default.png', max_length=500, null=True, upload_to='users_photos', validators=[user_data.models.validate_image_size]),
        ),
    ]
