from utils.entity import RegisterRequestBody,LoginRequestBody
from utils.constants import PortfolioAPI
from utils.handleResponse import PortfolioResponse

#? Authentication tests
class AuthEntity:
    def __init__(self):
        #? Dependencies (to be used by child classes)
        self.profile_id = None
        self.profile_name = None
        self.access_token = None
        self.refresh_token = None

        #? Response
        self.registerResponse = {}
        self.loginResponse = {}
        self.regenerateTokenresponse = {}
        self.logoutResponse = {}

    def register(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=PortfolioAPI.PORTFOLIO_AUTH_URL,endpoint=PortfolioAPI.Auth.REGISTER),
            data=RegisterRequestBody,
            headers={'Content-type': 'application/json'}
        )


    def login(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=PortfolioAPI.PORTFOLIO_AUTH_URL,endpoint=PortfolioAPI.Auth.LOGIN),
            data=LoginRequestBody,
            headers={'Content-type': 'application/json'}
        )
  
    
    def regenerateToken(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=PortfolioAPI.PORTFOLIO_AUTH_URL,endpoint=PortfolioAPI.Auth.REGENERATE_TOKEN),
            data={'token': self.refresh_token},
            headers={'Content-type': 'application/json'}
        )

    def logout(self):
        return PortfolioAPI.post(
            url=PortfolioAPI.buildURL(url=PortfolioAPI.PORTFOLIO_AUTH_URL,endpoint=PortfolioAPI.Auth.LOGOUT),
            data={'token': self.refresh_token},
            headers={'Content-type': 'application/json'}
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
        self.regenerateToken()

        #? Logout
        self.logout()

    def runBasic(self):
        #? Register and Login
        self.registerAndLogin()
        
