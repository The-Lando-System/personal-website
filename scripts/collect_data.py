import serial
import time
import json
import requests
import argparse
import sys
from time import strftime

parser = argparse.ArgumentParser(description='Provide ops for the environment')
parser.add_argument('--ops', action='store_true', default=False, dest='ops')
args = parser.parse_args()
#print('value of --ops: ' + str(args.ops))

#sys.exit(0)

def postToWebsite( data ):
	print(data)
	postData = {
		"frequency": data,
		"timestamp": strftime("%Y-%m-%dT%H:%M:%S")
	}
	postData = json.dumps(postData)
	url = 'http://localhost:3000/sound-data/add-sound-data'
	if args.ops:
		url = 'https://landosnotasystem.herokuapp.com/sound-data/add-sound-data'

	headers = {'Content-type': 'application/json'}
	print
	r = requests.post(url,data=postData,headers=headers)
	#print(r)
	return

def postProcess( dataArray ):
	#print(dataArray)
	total = 0
	for value in dataArray:
		total += value
	avg = total / len(dataArray)
	postToWebsite(str(avg))
	return


ser = serial.Serial('COM3',9600,timeout=0)
dataArray = []
count = 0

while True:
	data = ser.readline().rstrip().decode("utf-8")
	if data != '':
		#print(data)
		dataArray.append(int(data))
	else:
		dataArray.append(0)
	time.sleep(0.01)
	count+=1
	if count == 100:
		postProcess(dataArray)
		count = 0
		dataArray = []

