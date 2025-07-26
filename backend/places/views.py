from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Place
from .serializers import PlaceSerializer, PlaceAddSerializer

@api_view(['GET'])
def places_list(request):
    places = Place.objects.all()
    serializer = PlaceSerializer(places, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_place(request):
    serializer = PlaceAddSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Place added successfully"})

    return Response(serializer.errors, status=400)
