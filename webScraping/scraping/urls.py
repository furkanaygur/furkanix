from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('scrap/<str:keyword>/', views.scrap, name='scrap'),
]