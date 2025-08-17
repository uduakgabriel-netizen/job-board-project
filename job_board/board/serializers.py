from django_restframework import serializers
from .models import user, job , Application, company


class userserializer(serializers.Modelserializers):
    class Meta:
        model = user
    fields = '__all__'
    
    
     # SERIALIZER FOR JOB MODEL
    
class jobserializer(serializers.Modelserializers):
    class Meta:
        model = job
    fields = '__all__'
    
## serializer for company  

class Applicationserializer(serializers.Modelserializers):
    class Meta:
        model = Application
    feilds = '__all__'
    
    #serrializer for company
    
class companyserializer(serializers.Modelserializer):
    class Meta:
        model = company
    feilds ='__all__'
    