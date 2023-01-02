import json
from select import select
from flask import Flask, jsonify,render_template
from numpy import insert
from requests import request
import mysql.connector
import requests
from flask import request
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


################## INSERT INTO `device` (`device_id`, `vehicle_id`, `device_type`, `device_mac`, `device_details`) VALUES (NULL, '4', 'none', 'adasda', 'ddadd'), (NULL, '5', 'ad', 'dd', 'dd');

app = Flask(__name__)
CORS(app)


app.config["JWT_SECRET_KEY"] = "asdaskd8281y78hdisah@hD:>:>{@jakjdoaisjdi"  # Change this!
jwt = JWTManager(app)

def dBconnection():
    host = '67.205.163.34' #Your server(host) name 
    user = "sohail"
    password = "sohail123"
    database = 'geidea_portal'  
    cnx = mysql.connector.connect(host=host,user=user,password=password, database=database,)
    return cnx


################################################################################################
################################## USERS Authentication #####################################
################################################################################################

@app.route('/login',methods = ['POST'])
def login():
    credentials = request.json
    
    username = credentials['username']
    password = credentials['password']
    print("the username is:")
    print(username,password)
    cnx=dBconnection()   
    cursor = cnx.cursor()
    
    dbuser = "select id,username,type from users where username='{}' and password='{}'".format(username,password)
    cursor.execute(dbuser)
    user = {"id":None,"username":None,"type":None,"authenticated":False,}
    for i,j,k in cursor:
        user['id'] = i
        user['username'] = j
        user['type'] = k
    if user['id'] == None or user['username'] == None:
        return jsonify({"id":None,"username":None,"authenticated":False,})
    access_token = create_access_token(identity=[username,user['type']])
    return jsonify({"Token":access_token})

@app.route("/getuserroles", methods=["GET"])
@jwt_required()
def getuserroles():
    # Access the identity of the current user with get_jwt_identity

    cnx=dBconnection()      ###
    cursor = cnx.cursor()
    current_user = get_jwt_identity()
    query = ("select * from userroles where type='{}'".format(current_user[1]))
    cursor.execute(query)
    data=[]
    for i,j,k,l,m,n in cursor:
        data.append({"type":i,"manageTeamleaders":j,"manageTechnicians":k,"manageTerminals":l,"manageLocations":m,"manageResources":n,})
    cursor.close()
    cnx.close()     ###
    return jsonify(data), 200


@app.route("/checktokenvalidity", methods=["GET"])
@jwt_required()
def checktokenvalidity():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print("Current_user_identity is:",current_user)
    return jsonify(logged_in_as=current_user), 200







if __name__ == '__main__':
    app.run(debug=True,port=1143)