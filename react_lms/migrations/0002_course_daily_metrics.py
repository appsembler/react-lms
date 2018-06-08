# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('edx_figures', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseDailyMetrics',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('date_for', models.DateField()),
                ('course_id', models.CharField(max_length=255)),
                ('enrollment_count', models.IntegerField()),
                ('active_learners_today', models.IntegerField()),
                ('average_progress', models.DecimalField(null=True, max_digits=2, decimal_places=2, blank=True)),
                ('average_days_to_complete', models.IntegerField(null=True, blank=True)),
                ('num_learners_completed', models.IntegerField()),
            ],
            options={
                'ordering': ('date_for', 'course_id'),
            },
        ),
        migrations.AlterUniqueTogether(
            name='coursedailymetrics',
            unique_together=set([('course_id', 'date_for')]),
        ),
    ]
