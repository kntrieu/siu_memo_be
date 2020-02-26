const Memo = require('../models/memo.model.js');


// Create and Save a new Memo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Memo content can not be empty"
        });
    }

    // Create a memo
    const memo = new Memo({
        name: req.body.name || "Untitled Note", 
        content: req.body.content,
        from: req.body.from,
        to: req.body.to,
        created_date: new Date().toISOString(),
        user_id: "",
        color: ""
    });

    // Save Note in the database
    memo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all memo from the database.
exports.findAll = (req, res) => {
    Memo.find()
    .then(memos => {
        res.status(200).send(memos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single memo with a memoId
exports.findOne = (req, res) => {
    Memo.findById(req.params.memoId)
    .then(memo => {
        if(!memo) {
            return res.status(404).send({
                message: "Memo not found with id " + req.params.memoId
            });            
        }
        res.send(memo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Memo not found with id " + req.params.memoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving memo with id " + req.params.memoId
        });
    });
};

// Update a memo identified by the memoId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Memo content can not be empty"
        });
    }

    // Find note and update it with the request body
    Memo.findByIdAndUpdate(req.params.memoId, {
        name: req.body.name || "Untitled Memo",
        content: req.body.content,
        from: req.body.from,
        to: req.body.to,
    }, {new: true})
    .then(memo => {
        if(!memo) {
            return res.status(404).send({
                message: "Memo not found with id " + req.params.memoId
            });
        }
        res.send(memo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.memoId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.memoId
        });
    });
};
// Delete a memo with the specified memoId in the request
exports.delete = (req, res) => {
    Memo.findByIdAndRemove(req.params.memoId)
    .then(memo => {
        if(!memo) {
            return res.status(404).send({
                message: "Memo not found with id " + req.params.memoId
            });
        }
        res.send({message: "Memo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.memoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.memoId
        });
    });
};