
ROCK = 'A'
PAPER= 'B'
SCISSORS = 'C'
MYROCK = 'X'
MYPAPER = 'Y'
MYSCISSORS = 'Z'
LOSE = 'X'
DRAW = 'Y'
WIN = 'Z'

def resultOne(oponent, you):
    if(oponent == ROCK):
        if(you == MYROCK):
            return 1 + 3
        if(you == MYPAPER):
            return 2 + 6
        if(you == MYSCISSORS):
            return 3 + 0
    
    if(oponent == PAPER):
        if(you == MYROCK):
            return 1 + 0
        if(you == MYPAPER):
            return 2 + 3
        if(you == MYSCISSORS):
            return 3 + 6

    if(oponent == SCISSORS):
        if(you == MYROCK):
            return 1 + 6
        if(you == MYPAPER):
            return 2 + 0
        if(you == MYSCISSORS):
            return 3 + 3

def resultTwo(oponent, you):
    if(oponent == ROCK):
        if(you == LOSE):
            return 3 + 0
        if(you == DRAW):
            return 1 + 3
        if(you == WIN):
            return 2 + 6
    
    if(oponent == PAPER):
        if(you == LOSE):
            return 1 + 0
        if(you == DRAW):
            return 2 + 3
        if(you == WIN):
            return 3 + 6

    if(oponent == SCISSORS):
        if(you == LOSE):
            return 2 + 0
        if(you == DRAW):
            return 3 + 3
        if(you == WIN):
            return 1 + 6

file = open('data.txt', 'r')
Lines = file.readlines()

# Part 1

points = 0

for (line) in Lines:
    decisions = line.split(" ")
    points += resultOne(decisions[0],decisions[1].split('\n')[0])

print("I would get " + str(points) + " points in Total.")

# Part 2

points = 0

for (line) in Lines:
    decisions = line.split(" ")
    points += resultTwo(decisions[0],decisions[1].split('\n')[0])

print("I would get " + str(points) + " points in Total.")
