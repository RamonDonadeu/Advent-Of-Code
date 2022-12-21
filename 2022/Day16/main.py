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
        valveData={'flow':int(flowRate), 'open': False, 'accesToValves': []}
        for acces in valves:
            valveData['accesToValves'].append(acces.split(' ')[1])
        
        caveTree[valveName] = valveData

def heuristica(valve,time,flow):
    global caveTree
    if caveTree[valve]['open'] == True:
        return flow
    else:
        if(caveTree[valve]['flow'] == 0):
            return flow
        return flow + caveTree[valve]['flow'] * time
    
def walkTree(time,recursiveLevel,valve,flow,auxTree):
    
    if(recursiveLevel == 0):
        return heuristica(valve,time-1,flow)
    else:
        bestFlow=0
        # Open Actual Valve 
        if(not auxTree[valve]['open']):    
            auxTree[valve]['open']=True
            bestFlow = walkTree(time-1, recursiveLevel-1,valve,flow+caveTree[valve]['flow']*(time-1),auxTree)
            auxTree[valve]['open']=False
        # Skip Actual Valve
        for explore in caveTree[valve]['accesToValves']:
            exploreMore = walkTree(time-2, recursiveLevel-1,explore,flow,auxTree)
            if(exploreMore>bestFlow):
                bestFlow=exploreMore
        
        
        return bestFlow
        
        
    


recursiveLevel = 1
generateTree()
startingValve = 'AA'
actualValve = startingValve
timeCounter = 30
while timeCounter > 0:
    bestMove = 'Open'
    bestMoveValue = walkTree(timeCounter,recursiveLevel,actualValve,globalFlow,caveTree)
    if(timeCounter >= 1):
        for possibleValve in caveTree[actualValve]['accesToValves']:
            value = walkTree(timeCounter-1, recursiveLevel, possibleValve, globalFlow,caveTree)
            if(value >= bestMoveValue):
                bestMoveValue = value
                bestMove = possibleValve

    if(bestMove == 'Open'):        
        caveTree[actualValve]['open']=True
        globalFlow += timeCounter * caveTree[actualValve]['flow']

    else:
        actualValve = bestMove
    
    timeCounter -= 1


print('ei')

