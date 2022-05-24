from backend.models import db, Project, Feature, Route

def seed_projects():
    p1 = Project(title="First Test Project", user_id=1)
    p2 = Project(title="Second Test Project", user_id=1)


    db.session.add_all([p1, p2])
    db.session.commit()

    f1 = Feature(name="First Feature", project_id=1)
    f2 = Feature(name="Second Feature", project_id=1)

    db.session.add_all([f1,f2])
    db.session.commit()

    r1 = Route( type= "Front-End",
                method= null,
                path= "/resource",
                label= null,
                feature_id=1,
                project_id=1 ) 
    r2 = Route( type= "API",
                method= "GET",
                path= "/api/resource",
                label= "read all",
                feature_id=1,
                project_id=1 ) 
    r3 = Route( type= "API",
                method= "POST",
                path= "/api/resource",
                label= "new resource",
                feature_id=1,
                project_id=1 ) 
    r4 = Route( type= "Front-End",
                method= null,
                path= "/resource",
                label= "read all",
                feature_id=2,
                project_id=1 ) 

    db.session.add_all([r1,r2,r3,r4])
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE routes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE features RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    #db.session.commit()
