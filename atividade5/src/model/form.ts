// import mongoose, { CallbackError } from 'mongoose';
// import bcrypt from 'bcrypt';

// const formularioSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
//   comment: String,
// });

// formularioSchema.pre('save', async function (next: (error?: CallbackError | undefined) => void) {
//   try {

//     if (this.password) {
//       // Criptografar a senha antes de armazená-la no banco de dados
//       const hashedPassword = await bcrypt.hash(this.password, 10);
//       this.password = hashedPassword;
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     next(error as CallbackError);
//   }
// });

// const Formulario = mongoose.model('Formulario', formularioSchema);

// export default Formulario;
