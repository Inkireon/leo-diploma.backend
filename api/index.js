import express from "express"   
import {query} from "../db.js"
import cors from 'cors'
const PORT = process.env.PORT || 8080
const app = express();
app.use(cors())

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => console.log('Server ready on port %d', PORT));
 app.get( "/getClubs",async (req,res) => {
    try {
        const data = await query('SELECT * FROM locations');
        res.json(data.rows);
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      }
    
});
app.get("/getSlides",async (req, res) => {
  try {
    const data1 = await query('SELECT * FROM slides');
    res.json(data1.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
}) 
app.get("/getRevs",async (req, res) => {
  try {
    const data2 = await query('SELECT * FROM reviews');
    res.json(data2.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
}) 
app.post('/setup',async (req,res) =>{
  try {
    const {description, name, photo, weight, extInfo} = req.body
    await query('INSERT INTO testimoncals (description, name, photo, weight, extInfo) VALUES ($1, $2, $3, $4, $5)', [description, name, photo, weight, extInfo]);
    res.status(200).send({message : "succsess !!!"});
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
})
