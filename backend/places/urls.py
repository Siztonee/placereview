from django.urls import path
from . import views

urlpatterns = [
    path('', views.places_list),
    path('add/', views.add_place)
]
