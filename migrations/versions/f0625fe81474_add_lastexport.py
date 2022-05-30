"""add lastExport

Revision ID: f0625fe81474
Revises: 065c7f83a6e7
Create Date: 2022-05-30 12:08:41.769890

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0625fe81474'
down_revision = '065c7f83a6e7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('last_export', sa.DateTime(timezone=True), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'last_export')
    # ### end Alembic commands ###