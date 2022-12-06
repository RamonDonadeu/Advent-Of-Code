import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

def getResult():
    result = ''
    for stack in stacks:
        result += stack[-1]
    
    return result

def prepare(line):
    charIndex = 0
    stackIndex = 0   
    for char in line:
            if(charIndex == 1):
                if (stackIndex+1 > len(stacks) ):
                    stacks.append([])
                if(ord(char) >= 65 and ord(char) <= 90 ):
                    stacks[stackIndex].insert(0,char)
            charIndex += 1
            if(charIndex == 4):
                stackIndex += 1
                charIndex = charIndex % 4

stacks=[]
peparation = True

for line in Lines:
    line = line.split('\n')[0] 
    if(line==''):
        peparation = False
    elif(peparation):
        prepare(line)
    else:  
        line = line.split(' ')
        many =  int(line[1])
        fromStack = int(line[3])
        toStack = int(line [5])
        for i in range(many):
            stacks[toStack-1].append(stacks[fromStack-1].pop()) 

print('The top boxes are: ' + getResult())

# Part 2

stacks=[]
peparation = True

for line in Lines:
    line = line.split('\n')[0] 
    if(line==''):
        peparation = False
    elif(peparation):
        prepare(line)
    else:  
        line = line.split(' ')
        many =  int(line[1])
        fromStack = int(line[3])
        toStack = int(line [5])
        cratesToMove = stacks[fromStack-1][-many:]
        stacks[fromStack-1] = stacks[fromStack-1][:len(stacks[fromStack-1]) - many]
        
        for crate in cratesToMove:
            stacks[toStack-1].append(crate)

print('The top boxes are: ' + getResult())