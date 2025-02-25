import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1); // process code 1 code means exit with failure, 0 means success
//     }
// };

export const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "ProjectManagement" })
    .then((data) => {
      console.log(`Connected to db: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};
