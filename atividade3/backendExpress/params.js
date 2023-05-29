
import express from 'express';
const router  = express.Router();

router.get('/parametro/:id', (req, res) => {
    res.send("Parâmetro ID informado foi " + req.params.id);
});
  
router.get('/user/:u/nome/:n', (req, res) => {
    res.send("Usuário " + req.params.u  + " nome " + req.params.n);
});

export default router;