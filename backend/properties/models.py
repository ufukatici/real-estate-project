from django.db import models
from django.utils import timezone

class Property(models.Model):
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('condo', 'Condo'),
        ('villa', 'Villa'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
    area_sqft = models.IntegerField()
    image_url = models.URLField(blank=True)
    agent_name = models.CharField(max_length=100)
    agent_phone = models.CharField(max_length=20)
    agent_email = models.EmailField()
    listed_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=[('available', 'Available'), ('sold', 'Sold'), ('pending', 'Pending')], default='available')
    
    def __str__(self):
        return self.title

class Inquiry(models.Model):
    property = models.ForeignKey(Property, related_name='inquiries', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f'Inquiry from {self.name} for {self.property.title}'

