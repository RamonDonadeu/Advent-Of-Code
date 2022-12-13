import os 
import heapq
import math 
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()
mapa=[]
end = {'x':0,'y':0}
open={}
closed={}
allAs=[]

def createMap():
    global mapa
    global end
    global open
    start={}
    open={}
    xCounter = yCounter = 0
    mapa=[]
    for line in Lines:
        line = line.split('\n')[0]
        line = list(line)
        if('E' in line or 'S' in line):
            for char in line:
                if(char == 'E'):
                    end['x']=xCounter
                    end['y']=yCounter
                    for key in open:
                        open[key]={'cost': distance(start,end), 'parent': '', 'steps': 0}
                    break
                if(char == 'S'):
                    start={'x': xCounter, 'y': yCounter}
                    open['x'+str(xCounter)+'y'+str(yCounter)]={'cost': distance(start,end), 'parent': '', 'steps': 0}
                yCounter+=1
        mapa.append(list(line))
        xCounter+=1

def distance(origin, destination):
    return  math.sqrt((origin['x'] - destination['x'])**2+(origin['y']-destination['y'])**2)

def findNeighbour(x,y):
    global open
    global closed
    for i in range(x-1,x+2):
        for j in range(y-1,y+2):
            if(i >= 0 and j >= 0 and i < len(mapa) and j < len(mapa[0])):
                if(x==i or y==j):
                    if 'x'+str(i)+'y'+str(j) not in closed:
                        if((ord(mapa[i][j])-ord(mapa[x][y])<=1 and not mapa[i][j]=='E') or (mapa[x][y]=='z' and mapa[i][j]=='E') or mapa[x][y]=='S'):
                            distanceToEnd = distance(end,{'x':i,'y':j})
                            if 'x'+str(i)+'y'+str(j) in open:
                                if open['x'+str(i)+'y'+str(j)]['cost'] > distanceToEnd + closed['x'+str(x)+'y'+str(y)]['steps'] + 1:
                                    open['x'+str(i)+'y'+str(j)]={'cost': distanceToEnd+closed['x'+str(x)+'y'+str(y)]['steps'] + 1, 'parent': 'x'+str(x)+'y'+str(y), 'steps': closed['x'+str(x)+'y'+str(y)]['steps'] + 1}
                            else:
                                open['x'+str(i)+'y'+str(j)]={'cost': distanceToEnd+closed['x'+str(x)+'y'+str(y)]['steps'] + 1, 'parent': 'x'+str(x)+'y'+str(y), 'steps': closed['x'+str(x)+'y'+str(y)]['steps'] + 1}

    
def getBestNode():
    bestNodeDistance = -1
    bestNode = ''
    for key in open:
        if(open[key]['cost'] < bestNodeDistance or bestNodeDistance == -1):
            bestNodeDistance = open[key]['cost']
            bestNode = key
    
    return bestNode


def AStar():
    # A*
    found = False
    global open
    global closed
    closed={}
    while not found:
        current = getBestNode()
        if(current == ''):
            return -1
        closed[current]=open[current]   
        del open[current]    
        current = current.split('y')
        x = int(current[0].split('x')[1])
        y = int(current[1])
        if(x == end['x'] and y == end['y']):
            break
        
        findNeighbour(x,y)
    
    return(closed[current[0]+'y'+current[1]])
    
        
def printSolution(lastNode):
    xParent = int(lastNode['parent'].split('y')[0].split('x')[1])
    yParent= int(lastNode['parent'].split('y')[1])
    mapa[xParent][yParent]='#'
    parent = closed[lastNode['parent']]
    while parent['parent']!='':
        xParent = int(parent['parent'].split('y')[0].split('x')[1])
        yParent= int(parent['parent'].split('y')[1])
        mapa[xParent][yParent]='#'
        parent = closed[parent['parent']]
    
    for x in range (len(mapa)):
        row = ''
        for y in range(len(mapa[x])):
            row+=mapa[x][y]
        print(row)

def getAllAs():
    global open
    for x in range (len(mapa)):
        row = ''
        for y in range(len(mapa[x])):
            if(mapa[x][y]=='a' or mapa[x][y] == 'S'):               
                open['x'+str(x)+'y'+str(y)]={'cost': distance(end,{'x':x,'y':y}), 'parent': '', 'steps': 0}

bestPathFromA=-1
bestClosed=[]
for part in [1,2]:
    createMap()
    lastNode= ''
    if( part == 1):
        lastNode = AStar()
    else:
        getAllAs()
        lastNode = AStar()
        if(type(lastNode) == dict):
            if(bestPathFromA == -1 or bestPathFromA > lastNode['steps']):
                bestPathFromA=lastNode['steps']
                bestClosed = closed

    
    printSolution(lastNode)
    print('The shortest path is: ' + str([lastNode['steps']]))
    



