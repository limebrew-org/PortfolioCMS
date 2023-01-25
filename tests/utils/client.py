from auth.init import AuthEntity
from api.profile.init import ProfileEntity
from api.education.init import EducationEntity
from api.projects.init import ProjectEntity
from api.experience.init import ExperienceEntity
from api.skills.init import SkillEntity
from api.dashboard.init import DashboardEntity


MENU = ["ALL","AUTH","PROFILE","EDUCATION","PROJECTS","SKILLS","EXPERIENCE","DASHBOARD"]

class PortfolioClient:
    def __init__(self):
        self.userInput = ""

    def displayMenu(self):
        for idx,menu in enumerate(MENU):
            print("[{}] {}".format(idx+1,menu))

    def seperator(self):
        print("################################################################")


    def displayBar(self):
        self.seperator()
        print("         Welcome to Portfolio-CMS Py-Automation Testing")
        self.seperator()

    def getUserInput(self):
        try:
            self.seperator()
            optionSelected = int(input("Enter option (1|2|3..): "))
            return optionSelected
        except Exception as e:
            print("Invalid option selected")
            exit()
    
    def run(self):
        self.displayBar()
        self.displayMenu()
        self.userInput = self.getUserInput()

        #? Run All Tests
        if self.userInput == 1:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Profile Routes (GetByName, GetById, Update)
            profileEntity = ProfileEntity()
            profileEntity.runBasic()

            #* Run Education Routes (Add, GetAll, GetById, Update, DeleteById, DeleteAll)
            educationEntity = EducationEntity()
            educationEntity.runAll()

            #* Run Project Routes (Add, GetAll, GetById, UpdateById, DeleteById, DeleteAll)
            projectEntity = ProjectEntity()
            projectEntity.runAll()

            #* Run Skill Routes (Add, Get, Update, Delete)
            skillEntity = SkillEntity()
            skillEntity.runAll()

            #* Run Experience Routes ( Add, Get, Update, Delete)
            experienceEntity = ExperienceEntity()
            experienceEntity.runAll()

            #* Run Dashboard Routes (GetByName, GetByProfileId)
            dashboardEntity = DashboardEntity()
            dashboardEntity.runAll()
            

        #? Run Authentication Route Tests
        if self.userInput == 2:
            #* Run Auth Routes (Register, Login, Regenerate-Token, Logout)
            authEntity = AuthEntity()
            return authEntity.runAll()
            

        #? Run Profile Route Tests
        if self.userInput == 3:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Profile Routes
            profileEntity = ProfileEntity(authEntity.access_token,authEntity.refresh_token)
            return profileEntity.runAll()


        #? Run Education Route Tests
        if self.userInput == 4:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run education Routes
            educationEntity = EducationEntity(authEntity.access_token,authEntity.refresh_token)
            return educationEntity.runAll()
        

        #? Run Project Route Tests
        if self.userInput == 5:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Project Routes
            projectEntity = ProjectEntity(authEntity.access_token,authEntity.refresh_token)
            return projectEntity.runAll()
        

        #? Run Skill Route Tests
        if self.userInput == 6:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Skill Routes
            skillEntity = SkillEntity(authEntity.access_token,authEntity.refresh_token)
            return skillEntity.runAll()


        #? Run Experience Route Tests
        if self.userInput == 7:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Experience Routes
            experienceEntity = ExperienceEntity(authEntity.access_token,authEntity.refresh_token)
            return experienceEntity.runAll()


        #? Run Dashboard Route Tests
        if self.userInput == 8:
            #* Run Auth Routes (Register and Login)
            authEntity = AuthEntity()
            authEntity.runBasic()

            #* Run Dashboard Routes
            dashboardEntity = DashboardEntity(authEntity.access_token,authEntity.refresh_token)
            return dashboardEntity.runAll()
