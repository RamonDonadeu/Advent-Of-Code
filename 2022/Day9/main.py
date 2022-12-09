import os 
file = (os.path.dirname(os.path.realpath(__file__))) + "\data.txt"
file = open(file, 'r')
Lines = file.readlines()

headPosition = {'x' : 50,'y': 50}
tailPosition = {'x': 50,'y': 50}
positions = set([])

for line in Lines:
    line = line.split('\n')[0]
    direction = line[0]
    moves = int(line.split(' ')[1])
    for move in range(moves):
        if direction == 'R':
            headPosition['x'] += 1
        elif direction == 'L':
            headPosition['x']-=1
        elif direction == 'U':
            headPosition['y']-=1
        else:
            headPosition['y'] += 1
        
        if headPosition['x'] - tailPosition['x'] == -2:
            tailPosition['x']-=1
            if headPosition['y'] - tailPosition['y'] == -1:
                tailPosition['y']-=1
            if headPosition['y'] - tailPosition['y'] == 1:
                tailPosition['y']+=1
        if headPosition['x'] - tailPosition['x'] == 2:
            tailPosition['x']+=1
            if headPosition['y'] - tailPosition['y'] == 1:
                tailPosition['y']+=1
            if headPosition['y'] - tailPosition['y'] == -1:
                tailPosition['y']-=1
        if headPosition['y'] - tailPosition['y'] == -2:
            tailPosition['y']-=1
            if headPosition['x'] - tailPosition['x'] == -1:
                tailPosition['x']-=1
            if headPosition['x'] - tailPosition['x'] == 1:
                tailPosition['x']+=1
        if headPosition['y'] - tailPosition['y'] == 2:
            tailPosition['y']+=1
            if headPosition['x'] - tailPosition['x'] == 1:
                tailPosition['x']+=1
            if headPosition['x'] - tailPosition['x'] == -1:
                tailPosition['x']-=1

        positions.add(str(tailPosition['x'])+'X'+str(tailPosition['y'])+'Y')

print('The second knot visited ' + str(len(positions)) + ' positions')

ropePosition = [{'x' : 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50},{'x': 50,'y': 50}]
positions = set([])

for line in Lines:
    line = line.split('\n')[0]
    direction = line[0]
    moves = int(line.split(' ')[1])
    for move in range(moves):
        if direction == 'R':
            ropePosition[0]['x'] += 1
        elif direction == 'L':
            ropePosition[0]['x']-=1
        elif direction == 'U':
            ropePosition[0]['y']-=1
        else:
            ropePosition[0]['y'] += 1
        for knot in range(1,len(ropePosition)):
            if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] == -2:
                ropePosition[knot]['x']-=1
                if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] <= -1:
                    ropePosition[knot]['y']-=1
                if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] >= 1:
                    ropePosition[knot]['y']+=1
            if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] == 2:
                ropePosition[knot]['x']+=1
                if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] >= 1:
                    ropePosition[knot]['y']+=1
                if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] <= -1:
                    ropePosition[knot]['y']-=1
            if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] == -2:
                ropePosition[knot]['y']-=1
                if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] <= -1:
                    ropePosition[knot]['x']-=1
                if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] >= 1:
                    ropePosition[knot]['x']+=1
            if ropePosition[knot-1]['y'] - ropePosition[knot]['y'] == 2:
                ropePosition[knot]['y']+=1
                if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] >= 1:
                    ropePosition[knot]['x']+=1
                if ropePosition[knot-1]['x'] - ropePosition[knot]['x'] <= -1:
                    ropePosition[knot]['x']-=1

        positions.add(str(ropePosition[9]['x'])+'X'+str(ropePosition[9]['y'])+'Y')

        
print('The last knot visited ' + str(len(positions)) + ' positions')
