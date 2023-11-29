import os 
import time
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()
mapCoord={'top':0,'bot':'','left':'','right':''}
mask=0
caveMap=[]
sandCounter = -1
def clean():
    global mapCoord,mask,caveMap,sandCounter

    mapCoord={'top':0,'bot':'','left':'','right':''}
    mask=0
    caveMap=[]
    sandCounter = -1
def getMaxCoords():
    global mapCoord
    global mask
    for line in Lines:
        line = line.split('\n')[0]
        listOfRocks = line.split(' -> ')
        for rock in listOfRocks:
            coord = rock.split(',')
            coord = [eval(i) for i in coord]
            if (mapCoord['bot'] == '' or coord[1] > mapCoord['bot']):
                mapCoord['bot'] = coord[1]+1
            if (mapCoord['left'] == '' or coord[0] < mapCoord['left']):
                mapCoord['left'] = coord[0]-1
            if (mapCoord['right'] == '' or coord[0] > mapCoord['right']):
                mapCoord['right'] = coord[0]+1
        mask = mapCoord['left']
    if(part==2):
        mapCoord['bot']+=1

def drawMap():
    global caveMap
    for row in range(mapCoord['bot']+1):
        auxRow=[]
        for column in range(mapCoord['right']-mapCoord['left']+1):
            auxRow.append('.')
        caveMap.append(auxRow)
    if(part==2):
        for column in range(len(caveMap[0])):
            caveMap[-1][column]='#'
    for line in Lines:
        line = line.split('\n')[0]
        listOfRocks = line.split(' -> ')
        for i in range(len(listOfRocks)-1):
            startRock = [eval(i) for i in listOfRocks[i].split(',')]
            endRock= [eval(i) for i in listOfRocks[i+1].split(',')]
            if(startRock[0]==endRock[0]):
                if startRock[1]<endRock[1]:
                    increment = 1
                else:
                    increment = -1
                for coord in range(startRock[1],endRock[1]+increment, increment):
                    caveMap[coord][startRock[0]-mask]='#'
            else:
                if startRock[0]<endRock[0]:
                    increment = 1
                else:
                    increment = -1
                for coord in range(startRock[0],endRock[0]+increment, increment):
                    caveMap[startRock[1]][coord-mask]='#'

def printMap():
    if(printMapBool):
        time.sleep(0.01)
        print('\n')
        for x in range(len(caveMap)):
            str=''
            for y in range(len(caveMap[x])):
                str+=caveMap[x][y]
            print(str)

def dropSand():
    global caveMap
    global sandCounter
    while True:
        caveMap[0][500-mask]='o'
        sandCoord = [0,500-mask]
        sandCounter+=1

        printMap()   
        while True:   
            if(sandCoord[0]==mapCoord['bot']):
                break
            if(caveMap[sandCoord[0]+1][sandCoord[1]] == '.'):
                caveMap[sandCoord[0]][sandCoord[1]] = '.'
                sandCoord[0]+=1
                caveMap[sandCoord[0]][sandCoord[1]] = 'o'      
            elif(caveMap[sandCoord[0]+1][sandCoord[1]-1]) == '.' and sandCoord[1]-1 >= 0:
                caveMap[sandCoord[0]][sandCoord[1]] = '.'
                sandCoord[0]+=1
                sandCoord[1]-=1
                caveMap[sandCoord[0]][sandCoord[1]] = 'o'
            elif(sandCoord[1]+1 <= mapCoord['right'] - mask and caveMap[sandCoord[0]+1][sandCoord[1]+1] == '.'):
                caveMap[sandCoord[0]][sandCoord[1]] = '.'
                sandCoord[0]+=1
                sandCoord[1]+=1
                caveMap[sandCoord[0]][sandCoord[1]] = 'o'            
            elif(sandCoord[1]-1 < 0):
                sandCounter += (sandCoord[0]-500+mask)
                break                     
            elif(sandCoord[1]+1>mapCoord['right']-mask):
                sandCounter +=(500+sandCoord[0]+1)-(mask+sandCoord[1])-1
                break
            else:
                break
        
        if(sandCoord[0]==mapCoord['bot'] or (sandCoord[0]==0) and [sandCoord[0]==500-mask]):
            printMap()
            break
            

printMapBool=True
part=1
getMaxCoords()
drawMap()
printMap()
dropSand()
print(str(sandCounter) + ' units of sand are dropped until one of them goes into abbys')
part=2
clean()
getMaxCoords()
drawMap()
printMap()
dropSand()
print(str(sandCounter+1) + ' units of sand are dropped until the sand stops')

    
        
