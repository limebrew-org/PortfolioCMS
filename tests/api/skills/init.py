from auth.init import AuthEntity

class SkillEntity(AuthEntity):
    def __init__(self):
        super().__init__()
        super().runBasic()
        print("Skill Entity initialized")
    
    def getAll(self):
        pass

    def getByFieldName(self,fieldName):
        pass

    def getById(self,skillId):
        pass

    def add(self,skill):
        pass

    def update(self):
        pass

    def deleteById(self,skillId):
        pass

    def deleteAllByFieldName(self,fieldName):
        pass

    def deleteAll(self):
        pass
