from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Property, Inquiry
from .serializers import PropertySerializer, InquirySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-listed_at')
    serializer_class = PropertySerializer
    
    @action(detail=True, methods=['post'])
    def add_inquiry(self, request, pk=None):
        property_obj = self.get_object()
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(property=property_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer

