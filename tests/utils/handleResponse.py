import json
from utils.logger import Logger

class PortfolioResponse:
    def __init__(self):
        pass
    
    @staticmethod
    def isValidResponse(response):
        if response['status'] == 200:
            return True
        return False

    @staticmethod
    def formatJSON(response):
        return json.dumps(response,indent=6)


    @staticmethod
    def responseLog(response,route):
        if response['status'] == 200:
            Logger.success("[200] Status Ok! {} response: {}".format(route,PortfolioResponse.formatJSON(response)))
        if response['status'] == 201:
            Logger.success("[201] Resource updated successfully! {} response: ".format(route,PortfolioResponse.formatJSON(response)))
        if response['status'] == 400:
            Logger.error("[400] Bad Request! {} response: ".format(route,PortfolioResponse.formatJSON(response)))
        if response['status'] == 403:
            Logger.warning("[403] Authorization error! {} response: ".format(route,PortfolioResponse.formatJSON(response)))
        if response['status'] == 404:
            Logger.error("[404] Error not found! {} response: ".format(route,PortfolioResponse.formatJSON(response)))
        if response['status'] == 500:
            Logger.error("[500] Internal Server Error! {} response: ".format(route,PortfolioResponse.formatJSON(response)))