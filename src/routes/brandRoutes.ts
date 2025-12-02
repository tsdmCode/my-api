import { Router } from 'express';
import { createRecord, getRecords, updateRecord, deleteRecord, getRecord } from '../controllers/brandController';

const router = Router();

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const brandRoutes = router;
