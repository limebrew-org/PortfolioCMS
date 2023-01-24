from auth.init import AuthEntity
from api.profile.init import ProfileEntity
from api.education.init import EducationEntity
from api.projects.init import ProjectEntity
from api.experience.init import ExperienceEntity
from api.skills.init import SkillEntity
from api.dashboard.init import DashboardEntity

MENU = ["ALL","AUTH","PROFILE","EDUCATION","EXPERIENCE","PROJECTS","SKILLS","DASHBOARD"]

def displayMenu():
    for idx,menu in enumerate(MENU):
        print("[{}] {}".format(idx+1,menu))

def seperator():
    print("################################################################")


def displayInit():
    seperator()
    print("         Welcome to Portfolio-CMS Py-Automation Testing")
    seperator()

def getUserInput():
    try:
        seperator()
        optionSelected = int(input("Enter option (1|2|3..): "))
        return optionSelected
    except Exception as e:
        print("Invalid option selected")
        exit()


def main():
    displayInit()
    displayMenu()
    userInput = getUserInput()

    if userInput == 1:
        return print("Running all tests")
    if userInput == 2:
        authEntity = AuthEntity()
        authEntity.runAll()
        return print("Running Auth tests")
    if userInput == 3:
        profileEntity = ProfileEntity()
        profileEntity.runAll()
        return print("Running Profile tests")
    if userInput == 4:
        educationEntity = EducationEntity()
        return print("Running Education tests")
    if userInput == 5:
        experienceEntity = ExperienceEntity()
        return print("Running Experience tests")
    if userInput == 6:
        projectEntity = ProjectEntity()
        return print("Running Projects tests")
    if userInput == 7:
        skillEntity = SkillEntity()
        return print("Running Skills tests")
    if userInput == 8:
        dashboardEntity = DashboardEntity()
        return print("Running Dashboard tests")


if __name__ == "__main__":
    main()
    



    
