"""empty message

Revision ID: 2ec637a46417
Revises: d7caf3fef4a1
Create Date: 2022-05-18 21:22:00.140663

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ec637a46417'
down_revision = 'd7caf3fef4a1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('features',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('projects_repo_link_key', 'projects', type_='unique')
    op.drop_constraint('projects_site_link_key', 'projects', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('projects_site_link_key', 'projects', ['site_link'])
    op.create_unique_constraint('projects_repo_link_key', 'projects', ['repo_link'])
    op.drop_table('features')
    # ### end Alembic commands ###
