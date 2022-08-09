const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        //! Additonal properties no longer needed
        // , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     //useFindAndModify: false,  Line is deprecated now, no longer necessary
        // })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
