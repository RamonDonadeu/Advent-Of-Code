import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
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
topRight = set()
topLeft =set()
botRight = set()
botLeft = set()

for sensor in sensors:
    distance = sensor['distance']
    farAway = distance - abs(sensor['sensor']['y']-checkRow)
    for column in range(sensor['sensor']['x'] - farAway, sensor['sensor']['x']+farAway+1):
        if(not positionOcupied({'x':column,'y':checkRow})):
            impossible.add(column)

    topPosition = sensor['sensor']['y'] - distance
    botPosition = sensor['sensor']['y'] + distance
    leftPosition = sensor['sensor']['x'] - distance
    rightPosition = sensor['sensor']['x'] + distance
    sensor = sensor['sensor']
    if(topPosition >= checkRow):
        topLeft.add(sensor['x'] + abs(checkRow-topPosition))
        topRight.add(sensor['x'] - abs(checkRow-topPosition))
        botLeft.add(sensor['x'] - abs(checkRow-sensor['y'])-distance)
        botRight.add(sensor['x'] + abs(checkRow-sensor['y'])+distance)
    elif(topPosition <= checkRow): 
        topLeft.add(sensor['x'] - abs(checkRow-topPosition))
        topRight.add(sensor['x'] + abs(checkRow-topPosition))
        if(sensor['y'] <= checkRow):
            botLeft.add(sensor['x'] + abs(checkRow-sensor['y'])-distance)
            botRight.add(sensor['x'] - abs(checkRow-sensor['y'])+distance)
        elif(sensor['y'] >= checkRow):
            botLeft.add(sensor['x'] + abs(checkRow-sensor['y'])-distance)
            botLeft.add(sensor['x'] - abs(checkRow-sensor['y'])+distance)

print(len(impossible))

toLeft=[]
toRight=[]

for points in topLeft:
    for pointsPlus in botRight:
        if(points == pointsPlus - 2):
            toLeft.append({'br':[points,checkRow],'tl':[pointsPlus,checkRow]})

for points in botLeft:
    for pointsPlus in topRight:
        if(points == pointsPlus + 2):
            toRight.append(({'bl':[points-2,checkRow-2],'tr':[pointsPlus,checkRow]}))

found = False
for group in toLeft:
    for x in range(0,checkRow+1):
        newGroup = {'br':[group['br'][0]+x,group['br'][1]-x]}
        for perpendicular in toRight:
            newPerp = {'bl':[perpendicular['bl'][0]-x,perpendicular['bl'][1]+x]}
            if(newPerp['bl'][1]+1 == newGroup['br'][1]+x and newPerp['bl'][0] == group['br'][0]+1):
                found = True
            if(newPerp['bl'][1]+1 == newGroup['br'][1]-x and newPerp['bl'][0] == group['br'][0]+1):
                found = True
        if(found):
            break
            