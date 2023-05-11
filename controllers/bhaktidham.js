const Bhaktidham = require('../models/bhaktidham');

module.exports.index = async (req, res) => {
    const bhaktidhams = await Bhaktidham.find({});
    res.render('bhaktidhams/index', { bhaktidhams })
}

module.exports.getNewForm = async (req, res) => {
    res.render('bhaktidhams/new');
}

module.exports.createBhaktidham = async (req, res, next) => {
    const bhaktidham = new Bhaktidham(req.body.bhaktidham);
    bhaktidham.author = req.user._id;
    await bhaktidham.save();
    req.flash('success', 'Created new post Successfully');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}

module.exports.showBhaktidham = async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id).populate({
        path: 'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    if(!bhaktidham){
        req.flash('error', 'Cannot find bhaktidaham you are looking for!');
        return res.redirect('/bhaktidhams');
    }
    res.render('bhaktidhams/show', {bhaktidham});
}

module.exports.getEditForm = async (req, res) => {
    const { id } = req.params;
    const bhaktidham = await Bhaktidham.findById(req.params.id)
    if (!bhaktidham) {
        req.flash('error', 'Cannot find that bhaktidham for edit!');
        return res.redirect('/bhaktidhams');
    }
    res.render('bhaktidhams/edit', { bhaktidham });
}

module.exports.updateBhaktidham = async (req, res, next) => {
    const { id } = req.params;  
    const bhaktidham = await Bhaktidham.findByIdAndUpdate(id, { ...req.body.bhaktidham });
    req.flash('success', 'Successfully updated the bhaktidham!');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}

module.exports.deleteDham = async (req, res) => {
    const { id } = req.params;
    await Bhaktidham.findByIdAndDelete(id);
    req.flash('success', 'Entry is deleted successfully')
    res.redirect('/bhaktidhams');
}