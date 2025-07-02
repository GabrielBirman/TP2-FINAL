import {validateUser} from "../util/validateProducto.js";
import factoryModel from "../model/factory.user.model.js";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "../util/mailer.js";

class UsersService {
    constructor() {
    this.model = factoryModel.get("mongo");
  }
    loginUser = async (nombre, password) => {
        const user = await this.model.loginUser(nombre, password);
        return user;
    }
  
  createUsuario = async (usuario) => {
  const { error } = validateUser.validate(usuario, { abortEarly: false });

  if (error) {
    const err = new Error("error de validación");
    err.codigo = 400;
    err.detalles = error.details.map((e) => ({
      campo: e.path[0],
      mensaje: e.message,
    }));
    throw err;
  }

  const hashedPassword = await bcrypt.hash(usuario.password, 10);
  usuario.password = hashedPassword;

  const postUsers = await this.model.postUsers(usuario);

  await sendWelcomeEmail(usuario.email, usuario.username);
  
  return postUsers;
};

  getUsers = async () => {
        const users = await this.model.getUsers();
        return users;
    }


   
    putUsers = async (id, data) => {
       
        const update = await this.model.putUsers(id, data);
        return update;
    }
    patchUsers = async (id, data) => {
       
        const update = await this.model.patchUsers(id, data);
        return update;
    }
    deleteUsers = async (id) => {
        const userDelete = await this.model.deleteUsers(id);
        return userDelete;
    }
    getUserByNombre = async (username) => {
        const user = await this.model.getUserByNombre(username);
        return user;
    }
    


    

}

export default UsersService