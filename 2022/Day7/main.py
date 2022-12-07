import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

result  = 0
directories = {}

def createStructure():   
    global result 
    global directories
    thisLevel = {}
    line = Lines.pop(0)
    while len(Lines) > 0:
        if(line[0] == '$'):
            if(line[2:4] == 'ls'):
                line = Lines.pop(0)
                while line[0] != '$':
                    if(line[0:3] != 'dir'):
                       thisLevel[line.split(' ')[1]] = line.split(' ')[0]
                    if(len(Lines)>0):
                        line = Lines.pop(0)   
                    else: 
                        size = 0
                        for sizes in thisLevel:
                            size += int(thisLevel[sizes])
                        return size
            if(line[2:4] == 'cd'):
                if(line[5:7] != '..'):          
                    size = createStructure()  
                    if(size < 100000):
                        result += size
                    
                    directories[line[5:7]] = size
                    thisLevel[line.split(' ')[2]] = size
                    if(len(Lines)>0):
                        line = Lines.pop(0)   
                    else: 
                        size = 0
                        for sizes in thisLevel:
                            size += int(thisLevel[sizes])
                        return size
                else:
                    size = 0
                    for sizes in thisLevel:
                        size += int(thisLevel[sizes])
                    return size

result = 0  
Lines.pop(0)
total = createStructure()

print('Freeable space is: ' + str(result))

print('The total size of the outermost directory is ' + str(total))
unused = 70000000-total
print('This means that the size of the unused space must currently be ' + str(unused))
print('We need 30000000 of free space to update the system')
needed = 30000000-(70000000-total)
print('Therefore, the update still requires a directory with total size of at least ' + str(needed))

bestSpace = -1
best = ''
for dir in directories:
    if(directories[dir]>needed):
        if(bestSpace>directories[dir]-needed or bestSpace == -1):
            bestSpace=directories[dir]-needed
            best = dir

print('The smallest directory to delete is ' + str(directories[best]))