# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SiteDailyMetrics',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('date_for', models.DateField(unique=True)),
                ('cumulative_active_user_count', models.IntegerField(null=True, blank=True)),
                ('todays_active_user_count', models.IntegerField(null=True, blank=True)),
                ('total_user_count', models.IntegerField()),
                ('course_count', models.IntegerField()),
                ('total_enrollment_count', models.IntegerField()),
            ],
            options={
                'ordering': ['-date_for'],
            },
        ),
    ]
