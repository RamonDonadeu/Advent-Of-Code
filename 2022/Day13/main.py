import os 
import heapq
import math 
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

def checkMessage(left, right):
    try:
        for leftElement, rightElement in zip(left,right):
            if(type(leftElement) == int and type(rightElement) == int):
                if(leftElement < rightElement ):
                    return 'Right'
                elif(leftElement > rightElement):
                    return 'Wrong'
                else:
                    result = 'Equal'
            if(type(leftElement) == list and type(rightElement) == list):
            #     compare='Wrong'
                result = checkMessage(leftElement,rightElement)
                if(result != 'Equal'):
                    return result
            if(type(leftElement) == list and type(rightElement) == int or type(leftElement) == int and type(rightElement) == list):
                if(type(rightElement) == int):
                    rightElement=[rightElement]
                else:
                    leftElement=[leftElement]
                
                result = checkMessage(leftElement,rightElement)
        if(len(left)>len(right)):
            return 'Worng'
        elif(len(left)<len(right)):
            return 'Right'
        else: return result
    except:
        return 'Wrong'

def createPackage(line):
    package=[]
    inside = 0
    for i in range(len(line)):
        if(line[i] != ','):
            if(line[i]=='['):
                if(inside == 0):
                    package.append(createPackage(line[i+1:]))
                inside += 1
            elif(line[i]==']'):
                if(inside == 0):
                    return package
                else:
                    inside -= 1
                
            elif(inside == 0):
                package.append(int(line[i]))
    return package



twoRows = 0
left=[]
right=0
counter = 1
for line in Lines:
    line = line.split('\n')[0]
    if(line!=''):
        recieved = createPackage(line[1:-1])
        if(twoRows % 2 == 1):
            result = checkMessage(left,recieved)
            if(result == 'Right'):
                right += counter
            counter += 1
        else:
            left=recieved
        twoRows+=1

print('The sum of pair of packages is ' + str(right))

    
        
