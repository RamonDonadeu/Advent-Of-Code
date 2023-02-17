import os

file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

aviableSpaces = 0
space = []
maxX = 0
maxY = 0
maxZ = 0

def getMaxDimensions():
  global maxX, maxY, maxZ
  for line in Lines:
    x = int( line.split(',')[0])
    if(x > maxX):
      maxX = x
    y = int(line.split(',')[1])
    if(y > maxY):
      maxY = y
    z = int(line.split(',')[2])
    if(z > maxZ):
      maxZ = z

  maxX += 1
  maxY += 1
  maxZ += 1   


def createSpace():
  for x in range(maxX):
    space.append([])
    for y in range(maxY):
      space[x].append([])
      for z in range(maxZ):
        space[x][y].append(' ')

def hasNeighbor(x,y,z):
  if(x == -1 or y == -1 or z == -1):
     return False
  try:
    return space[x][y][z] == 'X'
  except:
    return False
  

def addCube(x,y,z):
  global aviableSpaces
  space[x][y][z] = 'X'

  aviableSpaces += 6
  if(hasNeighbor(x+1,y,z)):
    aviableSpaces -= 2 
  if(hasNeighbor(x-1,y,z)):
    aviableSpaces -= 2 
  if(hasNeighbor(x,y+1,z)):
    aviableSpaces -= 2 
  if(hasNeighbor(x,y-1,z)):
    aviableSpaces -= 2 
  if(hasNeighbor(x,y,z+1)):
    aviableSpaces -= 2 
  if(hasNeighbor(x,y,z-1)):
    aviableSpaces -= 2 

getMaxDimensions()
createSpace()

for line in Lines:
  x = int(line.split(',')[0])
  y = int(line.split(',')[1])
  z = int(line.split(',')[2])
  addCube(x,y,z)

print(aviableSpaces)