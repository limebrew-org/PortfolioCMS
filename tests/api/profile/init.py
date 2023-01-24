from auth.init import AuthEntity
from utils.constants import PortfolioAPI
from utils.entity import RegisterRequestBody
from utils.handleResponse import PortfolioResponse
from utils.logger import Logger


class ProfileEntity(AuthEntity):
    def __init__(self):
        super().__init__()
        super().runBasic()
        self.base_url = PortfolioAPI.PORTFOLIO_API_URL
        self.profile_name = RegisterRequestBody['username']
        self.profileResponseByName = {}
        self.profileResponseById = {}

    def getByName(self):
        return PortfolioAPI.get(
            url=PortfolioAPI.buildURL(
                url=self.base_url,
                endpoint=PortfolioAPI.buildURL(
                    url=PortfolioAPI.API.Profile.GET,
                    endpoint="?profile_name={}".format(self.profile_name)
                )
            )
        )
        

    def getById(self):
        return PortfolioAPI.get(
            url=PortfolioAPI.buildURL(
                url=self.base_url,
                endpoint=PortfolioAPI.buildURL(
                    url=PortfolioAPI.API.Profile.GET,
                    endpoint="?profile_id={}".format(self.profile_id)
                )
            )
        )

    def update(self):
        pass

    def delete(self):
        pass

    def runAll(self):
        self.profileResponseByName = self.getByName()
        PortfolioResponse.responseLog(self.profileResponseByName,'Profile (getByName)')

        if(PortfolioResponse.isValidResponse(self.profileResponseByName)):
            if(len(self.profileResponseByName['data']) == 1):
                self.profile_id = self.profileResponseByName['data'][0]['_id']
            else:
                self.profile_id = input("Enter profileId manually: ")


        self.profileResponseById = self.getById()
        PortfolioResponse.responseLog(self.profileResponseById ,'Profile (getById)')
        
            

        
