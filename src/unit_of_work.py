from .auth import UserRepository


class UnitOfWork:
    def __init__(self, db):
        self.db = db
        self.users = UserRepository(db)

    async def commit(self):
        await self.db.commit()

    async def rollback(self):
        await self.db.rollback()
