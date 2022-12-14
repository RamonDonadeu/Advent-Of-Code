import os 
import heapq
file = (os.path.dirname(os.path.realpath(__file__))) + "/data.txt"
file = open(file, 'r')
Lines = file.readlines()

monkeyItems = []
itemsCount=[]
monkeyInstructions = []
counter=-1
bigmod = 1

# ==================== PREPARATION ===============

for line in Lines :
    line=line.split('\n')[0]
    if(line[0:6]=='Monkey'):
        instructions={}
        counter+=1
    else:
        if(line[2:10]=='Starting'):
            values = line.split(':')[1].split(',')
            items = []
            for value in values:
                items.append(int(value))
            monkeyItems.append(items)
            itemsCount.append(0)
            monkeyInstructions.append({})
        elif(line[2:11]=='Operation'):
            monkeyInstructions[counter]['operation']=line.split('old')[1]
        elif(line[2:6]=='Test'):
            monkeyInstructions[counter]['divide']=int(line.split('by')[1])
            bigmod*=monkeyInstructions[counter]['divide']
        elif(line[7:11]=='true'):
            monkeyInstructions[counter]['true']=int(line.split('monkey')[1])
        elif(line[7:12]=='false'):
            monkeyInstructions[counter]['false']=int(line.split('monkey')[1])

for round in range(20):
    for monkey in range(len(monkeyItems)):
        for item in monkeyItems[monkey]:
            itemsCount[monkey]+=1
            if (monkeyInstructions[monkey]['operation'].split(' ')[2]==''):
                worryLevel = int(eval(str(item)+monkeyInstructions[monkey]['operation'].split(' ')[1]+str(item)) / 3)
            else:
                worryLevel = int(eval(str(item)+monkeyInstructions[monkey]['operation']) / 3)
            if(worryLevel % monkeyInstructions[monkey]['divide'] == 0):
                monkeyItems[monkeyInstructions[monkey]['true']].append(worryLevel)
            else:
                monkeyItems[monkeyInstructions[monkey]['false']].append(worryLevel)        
        monkeyItems[monkey]=[]

print(itemsCount)
higher = heapq.nlargest(2,itemsCount)
print('The level of monkey business is ' + str(higher[0]*higher[1]))

# ==================== PREPARATION  Round 2 ===============

monkeyItems = []
itemsCount=[]
monkeyInstructions = []
counter=-1

for line in Lines :
    line=line.split('\n')[0]
    if(line[0:6]=='Monkey'):
        instructions={}
        counter+=1
    else:
        if(line[2:10]=='Starting'):
            values = line.split(':')[1].split(',')
            items = []
            for value in values:
                items.append(int(value))
            monkeyItems.append(items)
            itemsCount.append(0)
            monkeyInstructions.append({})
        elif(line[2:11]=='Operation'):
            monkeyInstructions[counter]['operation']=line.split('old')[1]
        elif(line[2:6]=='Test'):
            monkeyInstructions[counter]['divide']=int(line.split('by')[1])
        elif(line[7:11]=='true'):
            monkeyInstructions[counter]['true']=int(line.split('monkey')[1])
        elif(line[7:12]=='false'):
            monkeyInstructions[counter]['false']=int(line.split('monkey')[1])

for round in range(10000):
    for monkey in range(len(monkeyItems)):
        for item in monkeyItems[monkey]:
            itemsCount[monkey]+=1
            if (monkeyInstructions[monkey]['operation'].split(' ')[2]==''):
                worryLevel = int(eval(str(item)+monkeyInstructions[monkey]['operation'].split(' ')[1]+str(item)) % bigmod)
            else:
                worryLevel = int(eval(str(item)+monkeyInstructions[monkey]['operation']) % bigmod)
            if(worryLevel % monkeyInstructions[monkey]['divide'] == 0):
                monkeyItems[monkeyInstructions[monkey]['true']].append(worryLevel)
            else:
                monkeyItems[monkeyInstructions[monkey]['false']].append(worryLevel)        
        monkeyItems[monkey]=[]
    
    if(round % 100 == 0):
        print(round)

print(itemsCount)
higher = heapq.nlargest(2,itemsCount)
print('The level of monkey business in round 2 is ' + str(higher[0]*higher[1]))

        


        



