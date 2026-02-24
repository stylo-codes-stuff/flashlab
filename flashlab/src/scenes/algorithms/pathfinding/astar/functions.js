import {npde} from './classes'
function h(node,end){
    return Math.hypot(node.x-end.x,node.y-end.y)
}
function d(n1,n2){
    return Math.hypot(n2.x-n1.x,n2.y-n1.y)
}
function getLowestNode(nodes){
    var lowest = nodes[0]
    for (node of nodes){
        if (node.f <lowest.f){
            lowest = node
                
            }
        }
        return lowest
    }

function getNeighbors(n1,nodes,dist){
    var neighbors = []
    for (node of nodes){
        if  (node !== n1 && d(n1,node) < dist){
            neighbors.push(node)
        }
    }
    return neighbors;
}
function reconstructPath(endNode){
    var cnode = endNode;
    var pstr = '['
    while(cnode.cameFrom != null){
        pstr += `(${cnode.x},${cnode.y}),`
        cnode = cnode.cameFrom
    }
    console.log(pstr + ']')
}
function astar(nodes,nDist){
    var start = randomChoice(nodes);
    start.valid = true
    var end = randomChoice(nodes);
    end.valid = true
    start.g = 0
    start.f = h(start,end)
    start.valid = true;
    var openset = [start];
    var closedSet = []
    while (openset.length>0){
        var current = getLowestNode(openset)
        if(current == end){
            reconstructPath(current)
            return
        }
        openset.splice(openset.indexOf(current), 1);
        closedSet.push(current)
        var neighbors = getNeighbors(current,nodes,nDist)
        for (let neighbor of neighbors){
            if(neighbor.valid == true && closedSet.includes(neighbor)== false){
            var tg = current.g + d(current,neighbor)
            if(tg<neighbor.g){
            neighbor.cameFrom = current
            neighbor.g = tg;
            neighbor.f = tg+ h(neighbor,end)
            if (openset.includes(neighbor) == false){
                openset.push(neighbor)
            }
            
            }

        }
    }
    
}
    return 'failure';

}