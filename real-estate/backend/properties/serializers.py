from rest_framework import serializers
from .models import Property, Inquiry

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']

class PropertySerializer(serializers.ModelSerializer):
    inquiries = InquirySerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'description', 'property_type', 'address', 'city', 'state', 'zip_code', 
                  'price', 'bedrooms', 'bathrooms', 'area_sqft', 'image_url', 'agent_name', 'agent_phone', 
                  'agent_email', 'listed_at', 'status', 'inquiries']

