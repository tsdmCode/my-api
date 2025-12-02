import { Router } from 'express';
import { createRecord, getRecords, getRecord, deleteRecord, updateRecord } from '../controllers/categoryController';

const router = Router();

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const categoryRoutes = router;
