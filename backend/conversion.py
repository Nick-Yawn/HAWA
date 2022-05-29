

def generateConversions(project):
    #first conversion: Routes by Feature

    rxfstr = ''
    counter = 0
    for feature in sorted(project.features, key=lambda f: f.created_at):
        rxfstr += f'# {counter}: {feature.name} \r\n'
        frontendroutes = ''
        apiroutes = ''
        for route in sorted(feature.routes, key=lambda r: r.created_at):
            if route.type.value == 'Front-End':
                frontendroutes += f'- `{route.path}` {route.label}\r\n'
            else:
                apiroutes += f'- `{route.method.name} {route.path}` {route.label}\r\n'
        if frontendroutes:
            rxfstr += '### Front-End \r\n'
            rxfstr += frontendroutes
        if apiroutes:
            rxfstr += '### API \r\n'
            rxfstr += apiroutes
        counter += 1
        
    print(rxfstr) 

    return [rxfstr]
