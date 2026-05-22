### Notes for modifying schemas using alembic

1. Make changes in api/db/models.py
2. Generate a migration file `uv run alembic revision --autogenerate -m "Migration message"`
3. Run migration locally (though Dockerfile runs it at startup) `uv run alembic upgrade head`

- `CMD ["sh", "-c", "uv run alembic upgrade head && uv run uvicorn api.main:app --host 0.0.0.0 --port 8000"]`

4. Check for current version `uv run alembic current`
