import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// () -> String으로된 데이터베이스 -> 어디에 데이터베이스가 저장되어 있는지
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Conneted to DB (●'◡'●)");
const handleError = error =>
  console.log(`Error on DB Connection:${error} 〒▽〒`);

db.once('open', handleOpen);
db.on('error', handleError);
