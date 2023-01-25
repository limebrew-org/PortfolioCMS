from auth.init import AuthEntity
from utils.constants import PortfolioAPI
from utils.entity import RegisterRequestBody
from utils.handleResponse import PortfolioResponse


class ProfileEntity(AuthEntity):
    #* Constructor
    def __init__(self):
        #? Initialize parent
        super().__init__()

        #? Set the profile Name to be queried
        super().profile_name = RegisterRequestBody['username']

        #? Specific to Profile
        self.base_url = PortfolioAPI.PORTFOLIO_API_URL
        self.profileResponseByName = {}
        self.profileResponseById = {}

    #* Get Profile By Name
    def getByName(self):
        return PortfolioAPI.get(
            url=PortfolioAPI.buildURL(
                url=PortfolioAPI.PORTFOLIO_API_URL,
                endpoint=PortfolioAPI.buildURL(
                    url=PortfolioAPI.API.Profile.GET,
                    endpoint="?profile_name={}".format(self.profile_name)
                )
            )
        )
        
    #* Get Profile By Id
    def getById(self,id:str):
        return PortfolioAPI.get(
            url=PortfolioAPI.buildURL(
                url=PortfolioAPI.PORTFOLIO_API_URL,
                endpoint=PortfolioAPI.buildURL(
                    url=PortfolioAPI.API.Profile.GET,
                    endpoint="?profile_id={}".format(id)
                )
            )
        )

    #* Update Profile (Middleware)
    def update(self):
        return PortfolioAPI.put(
            url=PortfolioAPI.buildURL(
                url=PortfolioAPI.PORTFOLIO_API_URL,
                endpoint=PortfolioAPI.API.Profile.UPDATE
            ),
            data={},
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer {}'.format(super().access_token)}
        )
    
    #* Delete Profile (Middleware)
    def delete(self):
        pass
    
    #? Run all Get methods
    def runGetMethods(self):
        #* Get Profile By Name
        self.profileResponseByName = self.getByName()
        PortfolioResponse.responseLog(self.profileResponseByName,'Profile (getByName)')

        #? If response is successful set the profile_id in Auth (parent Class)
        if(PortfolioResponse.isValidResponse(self.profileResponseByName)):
            if(len(self.profileResponseByName['data']) == 1):
                super().profile_id = self.profileResponseByName['data'][0]['_id']
            else:
                super().profile_id = input("Enter profileId manually: ")

        #* Get Profile by Id from Auth (Parent)
        self.profileResponseById = self.getById()
        PortfolioResponse.responseLog(self.profileResponseById ,'Profile (getById)')


    #? Entrypoint 1
    def runAll(self):
        #* Get Profile (By Id and name)
        self.runGetMethods()

        #* Update Profile (middleware-> JWT/APIKey)
        self.update()

        #* Delete Profile (middleware-> JWT/APIKey)
        self.delete()
    

    #? Entrypoint 2
    def runBasic(self):
        #* Get Profile (By Id and name)
        self.runGetMethods()

        #* Update Profile (middleware-> JWT/APIKey)
        self.update()

        
            

        
