import express from "express"   
import {query} from "../db.js"
import cors from 'cors'

const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => res.send("Welcome!!! to my Backend"));

app.listen(PORT, () => console.log('Server ready on port %d', PORT));


app.get( "/getClubs",async (req,res) => {

    try {
        const data = await query('SELECT * FROM locations');
        res.json(data.rows);
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      }
    
}

);


app.get("/getSlides",async (req, res) => {

  try {
    const data1 = await query('SELECT * FROM slides');
    res.json(data1.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }

}

);


app.get( "/getRevs",async (req, res) => {
 
  try {
    const data2 = await query('SELECT * FROM reviews');
    res.json(data2.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }

}

);


app.post( '/setClub',async (req,res) => {

  console.log(req.body)

  try {
    const {address, description, name, network, photo, typeNetwork} = req.body
    await query('INSERT INTO locations (address, description, name, network, photo, typeNetwork) VALUES ($1, $2, $3, $4, $5, $6)', [address, description, name, network, photo, typeNetwork]);
    res.status(200).send({message : "succsess !!!"});
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }

}

);
