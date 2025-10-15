const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const { RolePermission, Role, User, Doctor } = require("./models");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const rolePermissionRoutes = require("./routes/rolePermissionRoutes");
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req,res)=>res.send("Server Running "));

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
tes); 
async function syncDB(){
  try{
    await RolePermission.sync({alter:true});
    await Role.sync({alter:true});
    await User.sync({alter:true});
    await Doctor.sync({alter:true});
   
    console.log(" DB Synced");
  }catch(err){console.error("DB Sync Error:",err);}
}

sequelize.authenticate()
  .then(()=>console.log("DB Connected "))
  .catch(err=>console.error("DB Error ",err));

syncDB();
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT} `));
