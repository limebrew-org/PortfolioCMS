from auth.init import AuthEntity

class ExperienceEntity(AuthEntity):
    def __init__(self):
        super().__init__()
        super().runBasic()
        print("Education entity initialized")
    
    def getAll(self):
        pass

    def getAllInternship(self):
        pass

    def getInternshipById(self, id):
        pass

    def getAllJobs(self):
        pass

    def getJobById(self, id):
        pass

    def addInternship(self, internship):
        pass

    def addJob(self, job):
        pass

    def updateInternship(self):
        pass

    def updateJob(self):
        pass

    def deleteInternshipById(self):
        pass

    def deleteJobById(self):
        pass
