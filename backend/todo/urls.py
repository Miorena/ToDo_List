from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.tasks_list),
    path('tasks/<int:pk>/', views.modify_task),
    path('tasks/<int:pk>/delete/', views.delete_task),
]