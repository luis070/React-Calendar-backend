const mongoose = require('mongoose');


// no se porque me marca error cuando valido las demas cosas en el mongo conect 
const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN , {
            // useNewUrlParser: true, 
            // useUnifiedTopology: true, 
            // useCreateIndex: true
        } );
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de inicializar DB');
        
        
    }

}

module.exports = {
    dbConnection
}
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));