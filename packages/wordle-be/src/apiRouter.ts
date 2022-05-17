import {Router} from 'express';
import * as Controller from './controller';

const router = Router();
console.log('Loading API router');

router.get('/word', Controller.getWord);
router.get('/check', Controller.checkAnswer);

export default router;
