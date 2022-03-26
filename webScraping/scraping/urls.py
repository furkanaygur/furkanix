from django.urls import path
from . import views

urlpatterns = [
    path('scrap/<str:keyword>/', views.scrap, name='scrap'),
]