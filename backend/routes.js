import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export { routes };
