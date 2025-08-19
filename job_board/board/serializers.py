from rest_framework import serializers
from .models import User, Job , Application, Company
# from rest_framework import serializers
# from .models import User 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
    fields = '__all__'
    
    
     # SERIALIZER FOR JOB MODEL
    
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
    fields = '__all__'
    
# serializer for company  

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
    feilds = '__all__'
    
    #serrializer for company
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
    feilds ='__all__'
    