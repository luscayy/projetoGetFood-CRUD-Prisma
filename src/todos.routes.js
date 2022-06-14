const express = require("express");

const allTodos = [{ nome: "seila", status: false}];
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create
todosRoutes.post("/todos", async (request, response) => {
    const { name } = request.body;
    const GetFood = await prisma.getfood.create({
        data: {
          name,
        },  
    });

    return response.status(201).json(GetFood);
});

// Read
todosRoutes.get("/todos", async (request, response) => {
    const GetFood = await prisma.getfood.findMany()
    return response.status(200).json(GetFood);
});

// Update
todosRoutes.put("/todos", async (request, response) => {
  const {name, id, status} = request.body
  
  if (!id) {
    return response.status(400).json("Id é obrigatório");
  }

  const getfoodAlreadyExist = await prisma.getfood.findUnique({ where: { id } });

  if (!getfoodAlreadyExist) {
    return response.status(404).json("Não existe");
  }

  const GetFood = await prisma.getfood.update({
    where: {
      id,
    },
      data: {
        name, 
        status, 
      },
  });

  return response.status(200).json(GetFood)
});


// Delete
todosRoutes.delete("/todos/:id", async (request, response) => {
  const {id} = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id é obrigatório");
  }

  const getfoodAlreadyExist = await prisma.getfood.findUnique({ 
    where: { id: intId } 
  });

  if (!getfoodAlreadyExist) {
    return response.status(404).json("Não existe");
  }

  await prisma.getfood.delete({ where: { id: intId }});
  
  return response.status(200).send();

});


module.exports = todosRoutes;