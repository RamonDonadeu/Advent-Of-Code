import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

mapCoords={'left':'','right':'','top':'','bot':''}
sensors=[]

def getDistance(origin, destination):
    return math.ceil( math.sqrt((origin['x'] - destination['x'])**2+(origin['y']-destination['y'])**2))

def positionOcupied(coord):
    for sensor in sensors:
        if(sensor['sensor']['x'] == coord['x'] and sensor['sensor']['y'] == coord['y']):
            return True
        if(sensor['beacon']['x'] == coord['x'] and sensor['beacon']['y'] == coord['y']):
            return True
    return False

for line in Lines:
    line = line.split('\n')[0].split(': closest beacon is at ')
    sensor = line[0].split(',')
    beacon = line[1].split(',')
    coord={'sensor':{'x':int(sensor[0].split('=')[1]),'y':int(sensor[1].split('=')[1])},'beacon':{'x':int(beacon[0].split('=')[1]),'y':int(beacon[1].split('=')[1])}, 'distance': '' }
    coord['distance'] = getDistance(coord['sensor'],coord['beacon'])
    sensors.append(coord)
    if(mapCoords['right'] == '' or coord['sensor']['x'] > mapCoords['right']):
        mapCoords['right']=coord['sensor']['x']
    if(mapCoords['left'] == '' or coord['sensor']['x'] < mapCoords['left']):
        mapCoords['left']=coord['sensor']['x']
    if(mapCoords['bot'] == ''or coord['sensor']['y'] > mapCoords['bot'] ):
        mapCoords['bot']=coord['sensor']['y']
    if(mapCoords['top'] == '' or coord['sensor']['y'] < mapCoords['top'] ):
        mapCoords['top']=coord['sensor']['y']
    if(mapCoords['right'] == '' or coord['beacon']['x'] > mapCoords['right']):
        mapCoords['right']=coord['beacon']['x']
    if(mapCoords['left'] == '' or coord['beacon']['x'] < mapCoords['left']):
        mapCoords['left']=coord['beacon']['x']
    if(mapCoords['bot'] == ''or coord['beacon']['y'] > mapCoords['bot'] ):
        mapCoords['bot']=coord['beacon']['y']
    if(mapCoords['top'] == '' or coord['beacon']['y'] < mapCoords['top'] ):
        mapCoords['top']=coord['beacon']['y']

checkRow = 2000000
counter = 0
for col in range(mapCoords['left'],mapCoords['right']):
    if(not positionOcupied({'x': col, 'y': checkRow})):
        for sensor in sensors:
            if(getDistance({'x': col, 'y': checkRow}, sensor['sensor']) <= sensor['distance']):
                counter+=1
                break
           

print(counter)


        
