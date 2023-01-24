from auth.init import AuthEntity

class EducationEntity(AuthEntity):
    def __init__(self):
        super().__init__()
        super().runBasic()
        print("Education Entity initialized")
    
    def getAll(self):
        pass

    def getById(self,id):
        pass

    def add(self):
        pass

    def updateById(self, id):
        pass
        

