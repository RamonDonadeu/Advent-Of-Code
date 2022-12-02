# Using readlines()
file = open('data.txt', 'r')
Lines = file.readlines()

elve = 1
maxCalories=0
countCalories=0
countElve = 1

# Part 1

for (line) in Lines:
    if(line=='\n'):
        if(countCalories > maxCalories):
            maxCalories = countCalories
            elve = countElve        
        countElve += 1
        countCalories = 0
    else:
        countCalories+= int(line)

print("Elve " + str(elve) + " has " + str(maxCalories) + " Calories Stored")

# Part 2

maxCalories= [0,0,0]
countCalories= 0
countElve = 1

for (line) in Lines:
    if(line=='\n'):
        lower = 0
        for i in range(len(maxCalories)):
            if(maxCalories[i] < maxCalories[lower]):
                lower = i 
        if(maxCalories[lower] < countCalories):
            maxCalories[lower] = countCalories 
        countCalories = 0
    else:
        countCalories+= int(line)

lower = 0
for i in range(len(maxCalories)):
    if(maxCalories[i] < maxCalories[lower]):
        lower = i 
if(maxCalories[lower] < countCalories):
    maxCalories[lower] = countCalories 
countCalories = 0
print("Top 3 elves have " + str(sum(maxCalories)) + " Calories Stored")