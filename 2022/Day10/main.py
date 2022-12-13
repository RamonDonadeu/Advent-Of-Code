import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

cicle = 1
x = 1
saveIncrement = 0
xValue=[]
rowSprite=''

def drawSprite():
    global rowSprite
        
    if((cicle-1)%40== 0):
        print(rowSprite)
        rowSprite=''
    if((cicle-1)%40 >= x-1 and (cicle-1)%40 <= x+1):
        rowSprite+=('#')
    else:
        rowSprite+=('.')
        

def incrementCicle():
    global cicle
    global saveIncrement
    

    cicle += 1
    if(cicle % (saveIncrement * 40 + 20)== 0):
        xValue.append(x*cicle)
        saveIncrement+=1

for line in Lines:
    line = line.split('\n')[0]
    drawSprite()
    if(line[0:4]=='noop'):
        incrementCicle()
    else:
        incrementCicle()
        drawSprite()
        x+=int(line.split(' ')[1])
        incrementCicle()


print(rowSprite)
print('The total strength is ' + str(sum(xValue)))

    