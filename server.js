const express = require('express')
const app = express()
const cors = require('cors')
const Airtable = require('airtable-node')
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
                            .base(process.env.AIRTABLE_BASE_ID)
                            .table('Table 1')
// app.get('/table', async (req, res) => {
//     try {

//         const data = await airtable.list()
//         if(data) {
//             let w = data.records.map(record => {
//                return record.fields.Email.map(u => u)
//             })
//             console.log(w)
//         //   return res.json(data.records)
//         }

//     } catch (error) {
//         return res.json(error)
//     }
// })

app.post('/form', async (req, res) => {
    try {
        
        //Check for empty field
        if(!req.body.Email){
            return res.status(400).json({msg: 'Please enter email address'})
        }
        const user = await airtable.create({"fields": {"Email": req.body.Email}})
        if(user){
            return res.status(200).json({msg: 'Email Successfully Registered!'})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
app.listen(port, () => console.log('Server started successfully!'))