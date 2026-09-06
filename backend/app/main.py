from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.firewall import router as firewall_router
from app.api.dashboard import router as dashboard_router


app = FastAPI(
    title="AI Firewall",
    description="AI Security Layer for LLM Applications",
    version="1.0.0"
)

# Frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(firewall_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "AI Firewall Running",
        "status": "active",
        "version": "1.0.0"
    }