import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

forest = []
visibleTrees = 0
rangeTop = 0
rangeBot= 0
rangeRight= 0
rangeLeft = 0

def createForest():
    global forest
    for line in Lines:
        line= line.split('\n')[0]
        row = []
        for char in line:
            row.append(int(char))
        forest.append(row)

def checkBlockedTop(x,y):
    global rangeTop
    treeHeight = int(forest[x][y])
    tallestTree = 0
    for i in range(x-1,-1,-1):
        if(forest[i][y]>tallestTree):
            tallestTree=forest[i][y]
        
        rangeTop += 1
        if(treeHeight <= tallestTree):
            return True
    
    return False

def checkBlockedBottom(x,y):
    global rangeBot
    treeHeight = int(forest[x][y])
    tallestTree = 0
    for i in range(x+1,len(forest)):
        if(forest[i][y]>tallestTree):
            tallestTree=forest[i][y]
        rangeBot += 1
        if(treeHeight <= tallestTree):
            return True
    return False

def checkBlockedRight(x,y):
    global rangeRight
    treeHeight = int(forest[x][y])
    tallestTree = 0
    for j in range(y-1,-1,-1):
        if(forest[x][j]>tallestTree):
            tallestTree=forest[x][j]
        rangeRight += 1
        if(treeHeight <= tallestTree):
            return True
    
    return False

def checkBlockedLeft(x,y):
    global rangeLeft
    treeHeight = int(forest[x][y])
    tallestTree = 0
    for j in range(y+1,len(forest[0])):
        if(forest[x][j]>tallestTree):
            tallestTree=forest[x][j]
        rangeLeft += 1
        if(treeHeight <= tallestTree):
            return True
    
    return False
    

def checkTreeIsVisible(x,y):
    blocked = False
    if(not checkBlockedTop(x,y)):
        blocked = True
    if(not checkBlockedBottom(x,y)):
         blocked = True
    if(not checkBlockedLeft(x,y)):
         blocked = True
    if(not checkBlockedRight(x,y)):
         blocked = True
    return blocked


createForest()
#Side of forest
print("Forest has size " + str(len(forest)) + ' x ' +str(len(forest[0])))
visibleTrees = len(forest) * 2 + (len(forest[0]) - 2) * 2
highestScenic = 0
for x in range(1,len(forest[0])-1):
    for y in range(1,len(forest)-1):        
        rangeTop = rangeBot = rangeRight = rangeLeft = 0
        if(checkTreeIsVisible(x,y)):
            visibleTrees+=1
        scenic = rangeLeft * rangeBot * rangeRight * rangeTop
        if(highestScenic < scenic):
            highestScenic = scenic


print("There are "+str(visibleTrees)+ " visible trees")
print("The highest scenic point is " + str(highestScenic))