import os 
import time
import math
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()
figure = 0

def drawRow():
    print('_')

def drawPlus():
    print('+')

def drawL():
    print('L')

def drawCol():
    print('|')

def drawCube():
    print('cube')

def printFigure():
    global figure

    if(figure == 0):
        drawRow()
    elif(figure == 1):
        drawPlus()
    elif(figure == 2):
        drawL()
    elif(figure==3):
        drawCol()
    else:
        drawCube()
    
    figure = (figure+1)%5


