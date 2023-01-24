import requests as req
import json

class PortfolioAPI:
    @staticmethod
    def buildURL(url,endpoint):
        return url+endpoint

    @staticmethod
    def get(url):
        return req.get(url).json()

    @staticmethod
    def post(url:str,data:dict,headers=None):
        return req.post(url=url,data=json.dumps(data),headers=headers).json()
    
    @staticmethod
    def put(url, body=None, headers=None):
        return req.put(url, body, headers).json()
    
    @staticmethod
    def delete(url,headers=None):
        return req.delete(url,headers).json()

    PORTFOLIO_AUTH_URL = 'http://localhost:8000/auth'
    PORTFOLIO_API_URL = 'http://localhost:9000/api'

    class Auth:
        REGISTER = '/register'
        LOGIN = '/login'
        REGENERATE_TOKEN = '/token'
        LOGOUT = '/logout'
    
    class API:
        class Profile:
            GET = "/profile"
            UPDATE = '/profile/update'
            DELETE = '/profile/delete'
        
        class Education:
            GET_ALL = "/education/all"
            GET_BY_ID = "/education/"
            ADD = "/education/add"
            UPDATE_BY_ID = "/education/update/"
            DELETE_BY_ID = "/education/delete/"
            DELETE_ALL = "/education"
        
        class Project:
            GET_ALL = "/projects/all"
            GET_BY_ID = "/projects/"
            ADD = "/projects/add"
            UPDATE_BY_ID = "/projects/update/"
            DELETE_BY_ID = "/projects/delete/"
        
        class Experience:
            pass

        class Skills:
            pass

        class Dashboard:
            pass