import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

mapCoords={'left':'','right':'','top':'','bot':''}
sensors=[]
impossible = set()

def getDistance(origin, destination):
    a = abs(origin['x'] - destination['x'])
    b =abs(origin['y']-destination['y'])
    return a+b

def positionOcupied(coord):
    for sensor in sensors:
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

checkRow = 10
for sensor in sensors:
    distance = sensor['distance']
    farAway = distance - abs(sensor['sensor']['y']-checkRow)
    for column in range(sensor['sensor']['x'] - farAway, sensor['sensor']['x']+farAway+1):
        if(not positionOcupied({'x':column,'y':checkRow})):
            impossible.add(column)
    
print(len(impossible))
topLeft=set()
topRight=set()
botLeft=set()
botRight=set()

checkColumn=checkRow

for sensor in sensors:

    distance = sensor['distance']
    topDist = sensor['sensor']['y']-distance
    botDist = sensor['sensor']['y']+distance
    # TOP RIGHT
    if(sensor['sensor']['y']>checkRow):
        topRight.add(sensor['sensor']['x']+abs(checkRow-topDist))    
    #BOT RIGHT
    else:
        if(sensor['sensor']['y']<checkRow):
            botRight.add(sensor['sensor']['x']-abs(checkRow-botDist))
    #TOP LEFT
    if(sensor['sensor']['y']>checkColumn):
        topLeft.add(sensor['sensor']['x']-abs(checkColumn-topDist))    

    #BOT LEFT
    else:
        if(sensor['sensor']['y']<checkColumn):
            botLeft.add(sensor['sensor']['x']+abs(checkColumn-botDist))

print('Ei')

        



        
