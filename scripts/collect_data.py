import serial
import time
import json
import requests
import argparse
import sys
import datetime

collectFreq = 0.001	# in seconds
postFreq = 0.01		# in seconds, cannot be greater than collect
postFreq = postFreq / collectFreq

parser = argparse.ArgumentParser(description='Provide ops for the environment')
parser.add_argument('--ops', action='store_true', default=False, dest='ops')
args = parser.parse_args()


# Given a single value of sound data, post it to the website
def postToWebsite( data ):
	postData = {
		"frequency": data,
		"timestamp": datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")
	}
	postData = json.dumps(postData)
	url = 'http://localhost:3000/sound-data/add-sound-data'
	if args.ops:
		url = 'http://www.mattvoget.com/sound-data/add-sound-data'

	headers = {'Content-type': 'application/json'}
	r = requests.post(url,data=postData,headers=headers)
	return

# Given an array of sound data calculate the average and call the post method with it
def postProcess( dataArray ):
	total = 0
	for value in dataArray:
		total += value
	avg = total / len(dataArray)
	postToWebsite(str(avg))
	return

# Listen for data on the serial port, process data at the given frequency
ser = serial.Serial('COM3',9600,timeout=0)
dataArray = []
count = 0
while True:
	data = ser.readline().rstrip().decode("utf-8")
	if data != '':
		dataArray.append(int(data))
	else:
		dataArray.append(0)
	time.sleep(collectFreq)
	count+=1
	if count > postFreq:
		postProcess(dataArray)
		count = 0
		dataArray = []