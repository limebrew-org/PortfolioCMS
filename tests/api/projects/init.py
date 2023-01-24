from auth.init import AuthEntity

class ProjectEntity(AuthEntity):
    def __init__(self):
        super().__init__()
        super().runBasic()
        print("Project entity initialized")
    

    def getAll(self):
        pass

    def getById(self, id):
        pass

    def getByName(self, name):
        pass

    def add(self):
        pass

    def update(self):
        pass

    def deleteById(self, id):
        pass

    def deleteAll(self):
        pass

