 const notesCtrl = {};
const Note = require('../models/Note');
 notesCtrl.getNotes = async (req,res)=>{
   const notes = await Note.find();
   res.json(notes);
 };

 notesCtrl.createNote = async (req,res)=>{
     const {title, content, date,author} = req.body;
     const newNote = new Note({
         title,
         content,
         date,
         author
     });
    //  console.log(newNote);
    await newNote.save();
    res.json({messag:'Note saved'})
 };

 notesCtrl.getNote = async (req,res)=>{
     const note = await Note.findById(req.params.id);
     res.json(note);
 };

 notesCtrl.updateNotes = async (req,res)=>{
     const {title,content,author}=req.body;
    await  Note.findOneAndUpdate({_id:req.params.id},
         {
            title,
            content,
            author
     }
     );
    res.json({messag:'Note updated'});

 };

 notesCtrl.deleteNotes = async (req,res)=>{
   await  Note.findByIdAndDelete(req.params.id);
     res.json({messag:'Note deleted'});
 };


 module.exports = notesCtrl;