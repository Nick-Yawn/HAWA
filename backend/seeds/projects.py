from backend.models import db, Project, Feature

def seed_projects():
    p1 = Project(title="First Test Project", user_id=1)
    p2 = Project(title="Second Test Project", user_id=1)


    db.session.add_all([p1, p2])
    db.session.commit()

    f1 = Feature(name="First Feature", project_id=1)
    f2 = Feature(name="Second Feature", project_id=1)

    db.session.add_all([f1,f2])
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE features RESTART IDENTITY CASCADE')
    #db.session.commit()
