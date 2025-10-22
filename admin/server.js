const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const { RolePermission, Role, User, Doctor, Patient } = require("./models");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req,res)=>res.send("Server Running"));

app.use(authRoutes);
app.use("/doctors",doctorRoutes);
app.use(patientRoutes);

async function syncDB(){
  try{
    await RolePermission.sync({alter:true});
    await Role.sync({alter:true});
    await User.sync({alter:true});
    await Doctor.sync({alter:true});
    await Patient.sync({alter:true});
    console.log("DB Synced");
  }catch(err){console.error("DB Sync Error:",err);}
}

sequelize.authenticate()
  .then(()=>console.log("DB Connected"))
  .catch(err=>console.error("DB Error",err));

syncDB();
const PORT = process.env.PORT||5002;
app.listen(PORT,()=>console.log(`Server running on port ${PORT} 🚀`));
