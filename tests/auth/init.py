from utils.entity import RegisterRequestBody,LoginRequestBody
from utils.constants import PortfolioAPI
from utils.handleResponse import PortfolioResponse

#? Parent Class: (To be inherited by child classes -> API Entities)
class AuthEntity:
    def __init__(self):
        self.profile_id = None
        self.access_token = ""
        self.refresh_token = ""
        self.base_url = PortfolioAPI.PORTFOLIO_AUTH_URL
        self.endpoint = ""
        self.headers = {'Content-type': 'application/json'}
        self.data = {}
        self.registerResponse = {}
        self.loginResponse = {}
        self.regenerateTokenresponse = {}
        self.logoutResponse = {}

    def register(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=self.base_url,endpoint=PortfolioAPI.Auth.REGISTER),
            data=RegisterRequestBody,
            headers=self.headers
        )


    def login(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=self.base_url,endpoint=PortfolioAPI.Auth.LOGIN),
            data=LoginRequestBody,
            headers=self.headers
        )
  
    
    def regenerateToken(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=self.base_url,endpoint=PortfolioAPI.Auth.REGENERATE_TOKEN),
            data={'token': self.refresh_token},
            headers=self.headers
        )

    def logout(self):
        self.endpoint = PortfolioAPI.Auth.LOGOUT
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=self.base_url,endpoint=PortfolioAPI.Auth.LOGOUT),
            data={'token': self.refresh_token},
            headers=self.headers
        )

    def registerAndLogin(self):
        #? Register the Profile
        self.registerResponse = self.register()
        PortfolioResponse.responseLog(self.registerResponse,'Auth (register)')
        
        #? Once registered, login
        self.loginResponse = self.login()
        PortfolioResponse.responseLog(self.loginResponse,'Auth (login)')

        #? If response status is 200
        if(PortfolioResponse.isValidResponse(self.loginResponse)):
            #? Save the access token and refresh token that will be used later to authorize apis after inheritance
            self.access_token = self.loginResponse['data']['access_token']
            self.refresh_token = self.loginResponse['data']['refresh_token']



    def runAll(self):
        #? Register and Login
        self.registerAndLogin()

        #? Generate Token
        # self.regenerateToken()

        #? Logout
        # self.logout()

    def runBasic(self):
        #? Register and Login
        self.registerAndLogin()
        
