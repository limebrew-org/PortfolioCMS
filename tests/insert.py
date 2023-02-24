import string
import random
import requests as req
import json


URL = "http://localhost:8001/auth/register"

def randomGenerator(N):
    generator = ''.join(random.choices(string.ascii_lowercase + string.digits, k=N))
    return generator


def generateUserBody():
    username = randomGenerator(N=10)
    email = "{}@gmail.com".format(randomGenerator(N=9))
    password = randomGenerator(N=15)

    return {
        "username": username,
        "email" : email,
        "password" : password
    }

def insertUser(userInfo,index):
    headers = {'Content-Type': 'application/json'}
    res = req.post(url=URL,data=json.dumps(userInfo),headers=headers)

    if(res.status_code == 201):
        print("[{}] User created successfully".format(index+1))
    else:
        print("Something went wrong")


for i in range(5000):
    userInfo = generateUserBody()
    insertUser(userInfo,index=i)