import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

sum = 0
for (line) in Lines:
    line = line.split('\n')[0]
    middle = len(line)//2
    first = line[:middle]
    second = line[middle:]
    for character in first:
        if(character in second):
            character = ord(character) - 96
            if(character <= 0):
                character+=6+26*2
            sum+=character
            break        

print("The priority of all bags is "+ str(sum))

sum=0
for i in range(len(Lines)-2):
    
    if(i%3==0):
        first = (Lines[i])
        second = (Lines[i+1])
        third = (Lines[i+2])
        for character in first:
            if(character in second and character in third):
                character = ord(character) - 96
                if(character <= 0):
                    character+=6+26*2
                sum+=character
                break      


print("The priority badged items of all grpups is "+ str(sum))