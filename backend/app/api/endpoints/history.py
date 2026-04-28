from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import RunRecord
from app.schemas import RunRecordSchema

router = APIRouter(prefix="/history", tags=["history"])


@router.get("", response_model=list[RunRecordSchema])
def get_history_list(db: Session = Depends(get_db)) -> list[RunRecordSchema]:
    records = db.query(RunRecord).order_by(RunRecord.created_at.desc()).all()
    return [RunRecordSchema.model_validate(record) for record in records]


@router.get("/{record_id}", response_model=RunRecordSchema)
def get_history_detail(record_id: int, db: Session = Depends(get_db)) -> RunRecordSchema:
    record = db.query(RunRecord).filter(RunRecord.id == record_id).first()
    if record is None:
        raise HTTPException(status_code=404, detail="Run record not found.")

    return RunRecordSchema.model_validate(record)
