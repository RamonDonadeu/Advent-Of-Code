import os 
import heapq
import math 
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

def checkMessage(left, right):
    try:
        if(type(left) == int):
            if(type(right) == int):
                return left-right
            else:
                return checkMessage([left],right)
        else:
            if(type(right) == int):
                return checkMessage(left, [right])
        
        for leftElement, rightElement in zip(left,right):
            result = checkMessage(leftElement,rightElement)
            if result:
                return result
        
        return len(left) - len(right)
    except:
        return 'Wrong'

twoRows = 0
left=[]
right=0
counter = 1
i2 = 1
i6 = 2

for line in Lines:
    line = line.split('\n')[0]
    if(line!=''):
        recieved = eval(line)
        if checkMessage(recieved, [[2]]) < 0:
            i2 += 1
            i6 += 1
        elif checkMessage(recieved, [[6]]) < 0:
            i6 += 1
        if(twoRows % 2 == 1):
            if checkMessage(left,recieved) < 0:
                right += counter
            counter += 1
        else:
            left=recieved
        twoRows+=1

print('The sum of pair of packages is ' + str(right))
print('The decoder key is '+ str(i2*i6))

    
        
