import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()
globalFlow = 0
caveTree = {}

def generateTree():
    for line in Lines:
        line = line.split('\n')[0]
        valveName = line[6:8]
        flowRate = line.split('=')[1].split(';')[0]
        valves = line.split('valve')[1].split(',')
        valveData={'flow':flowRate, 'open': False, 'accesToValves': []}
        for acces in valves:
            valveData['accesToValves'].append(acces.split(' ')[1])
        
        caveTree[valveName] = valveData

def heuristica(valve,time):
    if
    
def walkTree(time,recursiveLevel,valve):
    global globalFlow
    if(recursiveLevel == 0):
        return heuristica(valve,time)
    else:
        # Open Actual Valve        
        openValve=0
        for explore in valve['accesToValves']:
            exploreMore = walkTree(time-3, recursiveLevel-1)
            if(exploreMore>openValve):
                openValve=exploreMore
        openValve += valve['flow']*time
        # Skip Actual Valve
        skipValve=0
        bestWalk = ''
        for explore in valve['accesToValves']:
            exploreMore = walkTree(time-3, recursiveLevel-1)
            if(exploreMore>skipValve):
                skipValve=exploreMore
                bestWalk = explore
        
        if(openValve > skipValve):
            return 'Open'
        else:
            return bestWalk
        
        
    


recursiveLevel = 1
generateTree()
startingValve = 'AA'
timeCounter = 30
while timeCounter > 0:
    walkTree()

print('ei')

