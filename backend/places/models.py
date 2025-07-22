from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

class Place(models.Model):
    name = models.CharField(max_length=70)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to='places/')

    rating = models.DecimalField(
        max_digits=2, 
        decimal_places=1, 
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )

    created_by = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='places'
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

