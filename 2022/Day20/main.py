import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

list = []

print(Lines)
for line in Lines:
    list.append({'value': int(line.split('\n')[0]), 'move': True})

print(list)
indexModifyer = 0
loopList = len(list)
for index in (range(len(list))):
    value = list[index-indexModifyer]
    for pos in range(abs(value)):
        if(value < 0):
            list[(index-pos-indexModifyer) % loopList] = list[(index-1-indexModifyer-pos) % loopList]
        elif (value > 0):

            list[(index-indexModifyer+pos) % loopList] = list[(index+1-indexModifyer+pos) % loopList]
    
    list[(index+value-indexModifyer) % loopList] = value



    
    

        



        
