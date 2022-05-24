"""empty message

Revision ID: fb926a815626
Revises: 2ec637a46417
Create Date: 2022-05-24 09:50:17.886724

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb926a815626'
down_revision = '2ec637a46417'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('routes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('Front-End', 'API', name='typeenum'), nullable=False),
    sa.Column('method', sa.Enum('GET', 'POST', 'PUT', 'PATCH', 'DELETE', name='methodenum'), nullable=True),
    sa.Column('path', sa.String(length=80), nullable=False),
    sa.Column('label', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('feature_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['feature_id'], ['features.id'], ),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('routes')
    sa_enum1 = sa.Enum(name='methodenum')
    sa_enum1.drop(op.get_bind(), checkfirst=True)
    sa_enum2 = sa.Enum(name='typeenum')
    sa_enum2.drop(op.get_bind(), checkfirst=True)
    # ### end Alembic commands ###
