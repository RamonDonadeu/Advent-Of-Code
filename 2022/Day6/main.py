import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

def check(string):
    for char in string:
        sepString = string.split(char)
        if(len(sepString)>2):
            return False
    return True

checker = ''
counter = 0
for line in Lines:
    for char in line:
        if(len(checker)==4):
            checker = checker[1:]
        checker=checker+char
        counter += 1
        if(len(checker)==4):
            if(check(checker)):
                break

print('first marker after character '+str(counter))

# Part 2

checker = ''
counter = 0
for line in Lines:
    for char in line:
        if(len(checker)==14):
            checker = checker[1:]
        checker=checker+char
        counter += 1
        if(len(checker)==14):
            if(check(checker)):
                break

print('first marker after character '+str(counter))