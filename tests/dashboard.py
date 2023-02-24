import requests as req
import time
 

URL = "http://localhost:8002/api/dashboard"

def getDashboard(username):
    res = req.get(URL +"?username={}".format(username))
    if(res.status_code == 200):
        print()


if __name__ == "__main__":
    #? Grab username from user input
    username = input("Enter username: ")

    start = time.time() #? Time starts
    getDashboard(username)
    end = time.time() #? Time ends
    print("Time taken: {}".format((end-start)))