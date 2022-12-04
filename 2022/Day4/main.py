import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

counter = 0
for line in Lines:
    line = line.split('\n')[0].split(',')
    if((int((line[0].split('-')[0]))<=int(line[1].split('-')[0]) and int(line[0].split('-')[1])>=int(line[1].split('-')[1])) or (int(line[1].split('-')[0])<=int((line[0].split('-')[0])) and int(line[1].split('-')[1])>=int(line[0].split('-')[1]))):
        counter += 1

print(str(counter) + " group of tasks are overlapped")

# Part 2

counter = 0
for line in Lines:
    line = line.split('\n')[0].split(',')
    if( (int(line[0].split('-')[0]) >= int(line[1].split('-')[0]) and int(line[0].split('-')[0]) <= int(line[1].split('-')[1])) or
        (int(line[0].split('-')[1]) >= int(line[1].split('-')[0]) and int(line[0].split('-')[1]) <= int(line[1].split('-')[1])) or
        (int(line[1].split('-')[0]) >= int(line[0].split('-')[0]) and int(line[1].split('-')[0]) <= int(line[0].split('-')[1])) or
        (int(line[1].split('-')[1]) >= int(line[0].split('-')[0]) and int(line[1].split('-')[1]) <= int(line[0].split('-')[1]))
        ):
        counter += 1

print(str(counter) + " tasks are overlapped")