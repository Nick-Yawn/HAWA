

def generateConversions(project):
    # first conversion: Routes by Feature
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
    # end RxFstring

    # second conversion: User Stories by Feature
    usxfstr = ''
    counter = 0
    for feature in sorted(project.features, key=lambda f: f.created_at):
        usxfstr += f'# {counter}: {feature.name} \r\n'
        prefixes = [ s.story.split(',',1)[0] for s in feature.user_stories ]
        prefix = ''
        if len(prefixes) > 1 and all([ prefixes[0] == p for p in prefixes ]):
            prefix = prefixes[0]
            usxfstr += prefix + ':\r\n'
        for user_story in sorted(feature.user_stories, key=lambda us: us.created_at):
            if user_story.operation:
                usxfstr += f'- {user_story.operation.name[0]} - '
            else:
                usxfstr += '- '
            if prefix:
                usxfstr += f'{user_story.story.split(",",1)[1]}\r\n'
            else:
                usxfstr += f'{user_story.story}\r\n'
        counter += 1
    # end USxFstr

    return [{'name':'Routes by Feature', 'output':rxfstr}, {'name':'User Stories by Feature', 'output':usxfstr}]
