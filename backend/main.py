from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.reports import router as reports_router
from routes.schemes import router as schemes_router
from routes.agent import router as agent_router

app = FastAPI(
    title="Jan-Sahayak API",
    description="AI-powered citizen health & welfare assistant backend",
    version="1.0.0",
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(reports_router, prefix="/api/reports", tags=["Reports"])
app.include_router(schemes_router, prefix="/api/schemes", tags=["Schemes"])
app.include_router(agent_router, prefix="/api/agent", tags=["Agent"])


@app.get("/")
async def root():
    return {"message": "Jan-Sahayak API is running 🚀", "docs": "/docs"}
