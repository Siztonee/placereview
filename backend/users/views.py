from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserRegistrationSerializer

@api_view(['GET'])
def users_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registration(request):
    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"})

    return Response(serializer.errors, status=400)