const Journal = require('../models/Journal')

module.exports = {
    getJournal: async (req,res)=>{
        console.log(req.user)
        try{
            const journalEntry = await Journal.find({userId:req.user.id}).sort({ entryDate: -1 })
            const itemsLeft = await Journal.countDocuments({userId:req.user.id,completed: false})
            res.render('journal.ejs', {journal: journalEntry, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createJournalEntry: async (req, res)=>{
        try{
            await Journal.create({journalSubject: req.body.journalSubject, journalDate: req.body.journalDate, journal: req.body.journalEntry, completed: false, userId: req.user.id})
            console.log('Journal entry has been added!')
            res.redirect('/journal')
        }catch(err){
            console.log(err)
        }
    },
    // not relevant for journal
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    // not relevant for journal
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteJournalEntry: async (req, res)=>{ console.log(req.body.journalIdFromJSFile)
        try{
            await Journal.findOneAndDelete({_id:req.body.journalIdFromJSFile})
            console.log('Deleted journal entry')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    
}    