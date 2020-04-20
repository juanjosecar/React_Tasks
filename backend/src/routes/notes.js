const {Router} = require('express');

const router = Router();
const{getNotes,createNote,getNote,updateNotes,deleteNotes} = require ('../controllers/notes.controller');

router.route('/')
.get(getNotes)
.post(createNote)


router.route('/:id')
.get(getNote)
.put(updateNotes)
.delete(deleteNotes)

module.exports = router;

